import {useLoaderData} from 'react-router';
import {mockProducts} from '~/mock/products';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [
    {title: `Hydrogen | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader({params}) {
  const {handle} = params;
  
  // Find the product in mock data based on the handle
  const product = mockProducts.find(product => product.handle === handle);

  if (!product) {
    // Use standard Response for 404
    return new Response('Not Found', {status: 404, headers: { 'Content-Type': 'text/plain' } });
  }

  // Use standard Response for JSON data
  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default function ProductHandle() {
  /** @type {LoaderReturnData} */
  const {product} = useLoaderData();

  // Basic rendering for demonstration
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>{product.title}</h1>
      <p>Vendor: {product.vendor}</p>
      {/* You could add more details or reuse the ProductItem component here */}
    </div>
  );
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @template T @typedef {import('react-router').MetaFunction<T>} MetaFunction */
