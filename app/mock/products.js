export const mockProducts = [
  {
    id: "1",
    title: "Plain T-shirt",
    handle: "plain-tshirt",
    vendor: "Good Brand Company",
    featuredImage: {
      id: "img1",
      url: "/assets/images/green.png",
      altText: "Green T-Shirt",
      width: 800,
      height: 800
    },
    images: {
      nodes: [
        {
          id: "img1",
          url: "/assets/images/green.png",
          altText: "Green T-Shirt Front",
          width: 800,
          height: 800
        },
        {
          id: "img2",
          url: "/assets/images/green-secondary.png",
          altText: "Green T-Shirt Side",
          width: 800,
          height: 800
        },
        {
          id: "img3",
          url: "/assets/images/blue.png",
          altText: "Blue T-Shirt Front",
          width: 800,
          height: 800
        },
         {
          id: "img4",
          url: "/assets/images/blue-secondary.png",
          altText: "Blue T-Shirt Side",
          width: 800,
          height: 800
        },
        {
          id: "img5",
          url: "/assets/images/navy.png",
          altText: "Navy T-Shirt Front",
          width: 800,
          height: 800
        },
         {
          id: "img6",
          url: "/assets/images/navy-secondary.png",
          altText: "Navy T-Shirt Side",
          width: 800,
          height: 800
        },
        {
          id: "img7",
          url: "/assets/images/orange.png",
          altText: "Orange T-Shirt Front",
          width: 800,
          height: 800
        },
         {
          id: "img8",
          url: "/assets/images/orange-secondary.png",
          altText: "Orange T-Shirt Side",
          width: 800,
          height: 800
        },
        {
          id: "img9",
          url: "/assets/images/pink.png",
          altText: "Pink T-Shirt Front",
          width: 800,
          height: 800
        },
         {
          id: "img10",
          url: "/assets/images/pink-secondary.png",
          altText: "Pink T-Shirt Side",
          width: 800,
          height: 800
        },
        {
          id: "img11",
          url: "/assets/images/yellow.png",
          altText: "Yellow T-Shirt Front",
          width: 800,
          height: 800
        },
         {
          id: "img12",
          url: "/assets/images/yellow-secondary.png",
          altText: "Yellow T-Shirt Side",
          width: 800,
          height: 800
        }
        // Add paths for other colors/views as needed
      ]
    },
    options: [
      {
        name: "Color",
        values: ["Green", "Blue", "Navy", "Orange", "Pink", "Yellow"]
      },
      // {
      //   name: "Size",
      //   values: ["S", "M", "L", "XL"]
      // }
    ],
    variants: {
      nodes: [
         {
          id: "var-green",
          availableForSale: true,
          selectedOptions: [
            { name: "Color", value: "Green" },
            // { name: "Size", value: "M" }
          ],
          image: {
            id: "img1",
            url: "/assets/images/green.png",
            altText: "Green T-Shirt",
            width: 800,
            height: 800
          },
          price: {
            amount: "20.00",
            currencyCode: "USD"
          },
          compareAtPrice: {
            amount: "29.50",
            currencyCode: "USD"
          }
        },
        {
          id: "var-blue",
          availableForSale: true,
          selectedOptions: [
            { name: "Color", value: "Blue" },
            // { name: "Size", value: "M" }
          ],
          image: {
            id: "img3",
            url: "/assets/images/blue.png",
            altText: "Blue T-Shirt",
            width: 800,
            height: 800
          },
          price: {
            amount: "20.00",
            currencyCode: "USD"
          },
          compareAtPrice: {
            amount: "29.50",
            currencyCode: "USD"
          }
        },
        {
          id: "var-navy",
          availableForSale: true,
          selectedOptions: [
            { name: "Color", value: "Navy" },
            // { name: "Size", value: "M" }
          ],
          image: {
            id: "img5",
            url: "/assets/images/navy.png",
            altText: "Navy T-Shirt",
            width: 800,
            height: 800
          },
          price: {
            amount: "20.00",
            currencyCode: "USD"
          },
          compareAtPrice: {
            amount: "29.50",
            currencyCode: "USD"
          }
        },
         {
          id: "var-orange",
          availableForSale: true,
          selectedOptions: [
            { name: "Color", value: "Orange" },
            // { name: "Size", value: "M" }
          ],
          image: {
            id: "img7",
            url: "/assets/images/orange.png",
            altText: "Orange T-Shirt",
            width: 800,
            height: 800
          },
          price: {
            amount: "20.00",
            currencyCode: "USD"
          },
          compareAtPrice: {
            amount: "29.50",
            currencyCode: "USD"
          }
        },
        {
          id: "var-pink",
          availableForSale: true,
          selectedOptions: [
            { name: "Color", value: "Pink" },
            // { name: "Size", value: "M" }
          ],
          image: {
            id: "img9",
            url: "/assets/images/pink.png",
            altText: "Pink T-Shirt",
            width: 800,
            height: 800
          },
          price: {
            amount: "20.00",
            currencyCode: "USD"
          },
          compareAtPrice: {
            amount: "29.50",
            currencyCode: "USD"
          }
        },
         {
          id: "var-yellow",
          availableForSale: true,
          selectedOptions: [
            { name: "Color", value: "Yellow" },
            // { name: "Size", value: "M" }
          ],
          image: {
            id: "img11",
            url: "/assets/images/yellow.png",
            altText: "Yellow T-Shirt",
            width: 800,
            height: 800
          },
          price: {
            amount: "20.00",
            currencyCode: "USD"
          },
          compareAtPrice: {
            amount: "29.50",
            currencyCode: "USD"
          }
        }
        // Add variants for other colors/sizes
      ]
    },
    priceRange: {
      minVariantPrice: {
        amount: "20.00",
        currencyCode: "USD"
      },
      maxVariantPrice: {
        amount: "29.50",
        currencyCode: "USD"
      }
    }
  },
]; 