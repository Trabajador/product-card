# Hydrogen Storefront Product Card

A modern, responsive product card component built with Shopify Hydrogen and React.

## Features

- Responsive design
- Color variant selection with swatches
- Image hover effects
- Sale badge
- Sold out indicator
- Price comparison
- Vendor information

## Live Demo

[View Live Demo](url_here)

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hydrogen-storefront.git

# Navigate to project directory
cd hydrogen-storefront

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

```jsx
import {ProductItem} from '~/components/ProductItem';

function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| product | Object | Product data from Shopify |
| loading | boolean | Loading state |

## Development

```bash
# Run tests
npm test

# Build for production
npm run build
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
