import { Product } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com';
const REVALIDATE_TIME = 3600;

export const productService = {
  getProductById: async (id: string): Promise<Product | null> => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (res.status === 404) return null;

    if (!res.ok) {
      throw new Error(`[ProductService] Gagal mengambil detail produk ID ${id}: ${res.status}`);
    }

    return res.json();
  },

  getRelatedProducts: async (category: string, currentId: string): Promise<Product[]> => {
    if (!category) return [];

    const encodedCategory = encodeURIComponent(category.toLowerCase());
    const res = await fetch(`${API_BASE_URL}/products/category/${encodedCategory}`, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!res.ok) {
      console.error(`[ProductService] Gagal mengambil produk terkait kategori "${category}": ${res.status}`);
      return [];
    }

    const products: Product[] = await res.json();
    if (!Array.isArray(products)) return [];

    return products
      .filter((item) => String(item.id) !== String(currentId))
      .slice(0, 4);
  },
};