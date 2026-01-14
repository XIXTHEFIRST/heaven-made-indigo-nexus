import { toast } from 'sonner';
import type { CartItem, ShopifyProduct } from '@/stores/cartStore';

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'heaven-made-indigo-nexus-ezi87.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = 'db9f59882c5c6e48c881026f9f7a929f';

export async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan. Your store needs to be upgraded to a paid plan. Visit https://admin.shopify.com to upgrade."
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

export async function getProducts(first: number = 50): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first });
  const localEdges = LOCAL_PRODUCTS.map(p => ({ node: p }));
  return [...localEdges, ...data.data.products.edges];
}

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;


const LOCAL_PRODUCTS: any[] = [
  {
    id: "gid://shopify/Product/local-angels",
    title: "ANGELS",
    description: "Premium cotton tee featuring the bold ANGELS graphic design. Part of the latest collection.",
    handle: "angels",
    priceRange: {
      minVariantPrice: {
        amount: "35000.00",
        currencyCode: "NGN"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "/angels-tee.jpg",
            altText: "ANGELS Tee"
          }
        }
      ]
    },
    variants: {
      edges: [
        // White Variants
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v1",
            title: "S / White",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "S" }, { name: "Color", value: "White" }]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v2",
            title: "M / White",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "M" }, { name: "Color", value: "White" }]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v3",
            title: "L / White",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "L" }, { name: "Color", value: "White" }]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v4",
            title: "XL / White",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "XL" }, { name: "Color", value: "White" }]
          }
        },
        // Black Variants
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v5",
            title: "S / Black",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "S" }, { name: "Color", value: "Black" }]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v6",
            title: "M / Black",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "M" }, { name: "Color", value: "Black" }]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v7",
            title: "L / Black",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "L" }, { name: "Color", value: "Black" }]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v8",
            title: "XL / Black",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "XL" }, { name: "Color", value: "Black" }]
          }
        },
        // Yellow Variants
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v9",
            title: "S / Yellow",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "S" }, { name: "Color", value: "Yellow" }]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v10",
            title: "M / Yellow",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "M" }, { name: "Color", value: "Yellow" }]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v11",
            title: "L / Yellow",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "L" }, { name: "Color", value: "Yellow" }]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/local-angels-v12",
            title: "XL / Yellow",
            price: { amount: "35000.00", currencyCode: "NGN" },
            availableForSale: true,
            selectedOptions: [{ name: "Size", value: "XL" }, { name: "Color", value: "Yellow" }]
          }
        }
      ]
    },
    options: [
      { name: "Size", values: ["S", "M", "L", "XL"] },
      { name: "Color", values: ["White", "Black", "Yellow"] }
    ]
  }
];

export async function getProductByHandle(handle: string) {
  const localProduct = LOCAL_PRODUCTS.find(p => p.handle === handle);
  if (localProduct) {
    return localProduct;
  }
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.data.productByHandle;
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  try {
    const lines = items.map(item => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: {
        lines,
      },
    });

    if (cartData.data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: any) => e.message).join(', ')}`);
    }

    const cart = cartData.data.cartCreate.cart;

    if (!cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    const checkoutUrl = url.toString();
    return checkoutUrl;
  } catch (error) {
    console.error('Error creating storefront checkout:', error);
    throw error;
  }
}
