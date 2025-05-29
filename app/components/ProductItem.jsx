import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {useState, useMemo, useEffect} from 'react';

// Color mapping for swatches
const COLOR_MAP = {
  Red: '#C0392B',
  Green: '#006600',
  Blue: '#00639C',
  Yellow: '#FCE78D',
  Pink: '#FFCCFF',
  Navy: '#19264B',
  Black: '#222',
  White: '#fff',
  Orange: '#FF6633',
  Clay: '#B66A50',
  Ocean: '#768da0',
  Purple: '#766589',
  Olive: '#7f8060',
  // Add more as needed
};
function getColorHex(name) {
  return COLOR_MAP[name] || '#ccc';
}

// Helper to get default options from the first available variant
function getDefaultOptionsFromVariant(product) {
  const firstVariant = product.variants?.nodes?.[0];
  if (firstVariant && firstVariant.selectedOptions) {
    return firstVariant.selectedOptions.reduce((acc, opt) => {
      acc[opt.name] = opt.value;
      return acc;
    }, {});
  }
  // fallback: first value of each option
  return (product.options || []).reduce((acc, option) => {
    acc[option.name] = option.values[0];
    return acc;
  }, {});
}

// ProductImage component
function ProductImage({product, isHovered, hasSecondaryImage, mainImage, secondaryImage, isOnSale, isAvailable, loading}) {
  return (
    <div className="relative w-full aspect-square mb-4">
      {isOnSale && (
        <div className="absolute top-2 left-2 bg-white border-2 border-red-500 text-red-500 rounded-full px-3 py-1 text-xs font-bold z-10">
          On Sale!
        </div>
      )}
      <div className="relative w-full h-full rounded-xl border border-gray-200 overflow-hidden">
        {mainImage && (
          <Image
            alt={mainImage.altText || product.title}
            aspectRatio="1/1"
            data={mainImage}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              isHovered && hasSecondaryImage ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        {secondaryImage && (
          <Image
            alt={secondaryImage.altText || product.title}
            aspectRatio="1/1"
            data={secondaryImage}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      {!isAvailable && (
        <div className="absolute top-2 right-2 bg-white border border-gray-400 text-gray-500 rounded-full px-2 py-1 text-xs font-semibold z-10">
          Sold Out
        </div>
      )}
    </div>
  );
}

// ProductColorSwatches component
function ProductColorSwatches({colorOption, selectedOptions, handleOptionChange, isOptionValueAvailable, getColorImages, getColorHex}) {
  if (!colorOption || colorOption.values.length <= 1) return null;

  // Filter only available colors
  const availableColors = colorOption.values.filter(value =>
    isOptionValueAvailable(colorOption.name, value)
  );

  if (availableColors.length <= 1) return null;

  return (
    <div className="flex gap-2 mb-3 self-baseline">
      {availableColors.map((value) => {
        const colorImages = getColorImages(value);
        const hasMultipleImages = colorImages.length > 1;
        return (
          <button
            key={value}
            className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
              selectedOptions[colorOption.name] === value ? 'border-gray-900' : 'border-gray-300'
            } focus:outline-none relative`}
            style={{ backgroundColor: getColorHex(value) }}
            onClick={() => handleOptionChange(colorOption.name, value)}
            title={value}
            aria-label={value}
          >
            {hasMultipleImages && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ProductInfo component
function ProductInfo({product, price, compareAtPrice, isOnSale}) {
  return (
    <div className="w-full text-left">
      {product.vendor && (
        <div className="text-gray-500 text-xs mb-1">{product.vendor}</div>
      )}
      <div className="font-semibold text-base mb-1">{product.title}</div>
      <div className="flex items-center gap-2">
        {isOnSale ? (
          <>
            <span className="text-gray-400 text-sm line-through">
              <Money data={compareAtPrice} />
            </span>
            <span className="text-red-600 font-bold text-base">
              <Money data={price} />
            </span>
          </>
        ) : (
          <span className="text-gray-900 font-semibold text-base">
            <Money data={price} />
          </span>
        )}
      </div>
    </div>
  );
}

export function ProductItem({product, loading}) {
  const [selectedOptions, setSelectedOptions] = useState(() => getDefaultOptionsFromVariant(product));
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setSelectedOptions(getDefaultOptionsFromVariant(product));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const formattedSelectedOptions = Object.entries(selectedOptions).map(([name, value]) => ({ name, value }));
  const selectedVariant = useMemo(() => {
    if (!product.variants?.nodes) return null;
    return product.variants.nodes.find(variant =>
      variant.selectedOptions.every(option => selectedOptions[option.name] === option.value)
    );
  }, [product.variants, selectedOptions]);

  const variantUrl = useVariantUrl(product.handle, formattedSelectedOptions);

  // Get all images for a specific color
  const getColorImages = (color) => {
    return product.images.nodes.filter(image =>
      image.url.toLowerCase().includes(color.toLowerCase())
    );
  };

  const colorOption = (product.options || []).find(opt => opt.name.toLowerCase() === 'color');

  // Get current and secondary images
  const getCurrentImages = () => {
    const selectedColor = selectedOptions[colorOption?.name];
    if (selectedColor) {
      const variantImages = getColorImages(selectedColor);
      return {
        main: variantImages[0] || selectedVariant?.image,
        secondary: variantImages[1] || null
      };
    }
    return {
      main: selectedVariant?.image || product.featuredImage,
      secondary: null
    };
  };

  const { main: mainImage, secondary: secondaryImage } = getCurrentImages();
  const hasSecondaryImage = !!secondaryImage;

  const price = selectedVariant?.price || product.priceRange?.minVariantPrice;
  const compareAtPrice = selectedVariant?.compareAtPrice || product.priceRange?.maxVariantPrice;
  const isOnSale = compareAtPrice?.amount > price?.amount;
  const isAvailable = selectedVariant?.availableForSale ?? true;

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const isOptionValueAvailable = (optionName, value) => {
    if (!product.variants?.nodes) return true;
    return product.variants.nodes.some(variant =>
      variant.availableForSale &&
      variant.selectedOptions.some(option => option.name === optionName && option.value === value)
    );
  };

  return (
    <div className="rounded-xl bg-white shadow-sm p-4 max-w-xs mx-auto">
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => hasSecondaryImage && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          className="block w-full"
          key={product.id}
          prefetch="intent"
          to={variantUrl}
        >
          <ProductImage
            product={product}
            isHovered={isHovered}
            hasSecondaryImage={hasSecondaryImage}
            mainImage={mainImage}
            secondaryImage={secondaryImage}
            isOnSale={isOnSale}
            isAvailable={isAvailable}
            loading={loading}
          />
        </Link>
        <ProductColorSwatches
          colorOption={colorOption}
          selectedOptions={selectedOptions}
          handleOptionChange={handleOptionChange}
          isOptionValueAvailable={isOptionValueAvailable}
          getColorImages={getColorImages}
          getColorHex={getColorHex}
        />
        <ProductInfo
          product={product}
          price={price}
          compareAtPrice={compareAtPrice}
          isOnSale={isOnSale}
        />
      </div>
      {/* <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
        {JSON.stringify(product, null, 2)}
      </pre> */}
      {/* <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
        {JSON.stringify(product.images?.nodes, null, 2)}
      </pre> */}
      {/* <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
        {JSON.stringify(selectedVariant, null, 2)}
      </pre> */}
    </div>
  );
}