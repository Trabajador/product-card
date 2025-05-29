import {useLoaderData} from 'react-router';
import {ProductItem} from '~/components/ProductItem';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Product Cards'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader({context}) {
  const {storefront} = context;
  
  const {products} = await storefront.query(PRODUCTS_QUERY);
  
  return {
    products: products.nodes,
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

const PRODUCTS_QUERY = `#graphql
  query Products {
    products(first: 8) {
      nodes {
        id
        title
        handle
        vendor
        featuredImage {
          id
          url
          altText
          width
          height
        }
        images(first: 2) {
          nodes {
            id
            url
            altText
            width
            height
          }
        }
        options {
          name
          values
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
            selectedOptions {
              name
              value
            }
            image {
              id
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('react-router').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
