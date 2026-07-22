import { Product } from '@/types/product';

const RAW_API_URL = 'https://fakestoreapi.com';

// CORS Proxy untuk bypass pemblokiran IP Vercel oleh Cloudflare FakeStoreAPI
const getProxiedUrl = (endpoint: string): string => {
  const targetUrl = `${RAW_API_URL}${endpoint}`;
  return `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
};

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const res = await fetch(getProxiedUrl('/products'), {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`[ProductService] Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  },

  getProductById: async (id: string): Promise<Product | null> => {
    const res = await fetch(getProxiedUrl(`/products/${id}`), {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 404) return null;

    if (!res.ok) {
      throw new Error(`[ProductService] Failed to fetch product ${id}: ${res.status} ${res.statusText}`);
    }

    return res.json();
  },

  getRelatedProducts: async (category: string, currentId: string): Promise<Product[]> => {
    const encodedCategory = encodeURIComponent(category.toLowerCase());
    const res = await fetch(getProxiedUrl(`/products/category/${encodedCategory}`), {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`[ProductService] Failed to fetch related products for ${category}: ${res.status}`);
      return [];
    }

    const products: Product[] = await res.json();
    if (!Array.isArray(products)) return [];

    return products
      .filter((item) => String(item.id) !== String(currentId))
      .slice(0, 4);
  },
};