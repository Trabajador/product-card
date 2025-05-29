import {useLoaderData} from 'react-router';
import {ProductItem} from '~/components/ProductItem';
import {mockProducts} from '~/mock/products';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Product Cards'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    products: mockProducts,
  };
}

export default function Homepage() {
  const {products} = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('react-router').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
