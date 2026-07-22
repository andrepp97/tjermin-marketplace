import { Product } from '@/types/product';

// Memastikan BASE_URL tidak diakhiri tanda '/' untuk menghindari double slash (//)
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com').replace(/\/$/, '');

// Standard header untuk menghindari pemblokiran oleh server API
const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const res = await fetch(`${API_BASE_URL}/products`, {
      cache: 'no-store',
      headers: DEFAULT_HEADERS,
    });

    // 🔴 LEMPAR ERROR jika fetch gagal, agar error.tsx langsung menampilkan pesan spesifik di Vercel
    if (!res.ok) {
      throw new Error(`[ProductService] Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error(`[ProductService] Expected array from API but got: ${typeof data}`);
    }

    return data;
  },

  getProductById: async (id: string): Promise<Product | null> => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'no-store',
      headers: DEFAULT_HEADERS,
    });

    if (res.status === 404) return null;

    if (!res.ok) {
      throw new Error(`[ProductService] Failed to fetch product ${id}: ${res.status} ${res.statusText}`);
    }

    return res.json();
  },

  getRelatedProducts: async (category: string, currentId: string): Promise<Product[]> => {
    // 🟡 WAJIB encodeURIComponent agar karakter seperti spasi / petik pada kategori tidak merusak URL
    const encodedCategory = encodeURIComponent(category.toLowerCase());
    const res = await fetch(`${API_BASE_URL}/products/category/${encodedCategory}`, {
      cache: 'no-store',
      headers: DEFAULT_HEADERS,
    });

    if (!res.ok) {
      console.error(`[ProductService] Failed to fetch related products for ${category}: ${res.status}`);
      return [];
    }

    const products = await res.json();
    if (!Array.isArray(products)) return [];

    return products
      .filter((item) => String(item.id) !== String(currentId))
      .slice(0, 4);
  },
};