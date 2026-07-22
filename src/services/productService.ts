import { Product } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    return res.json();
  },

  getProductById: async (id: string): Promise<Product | null> => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return res.json();
  },

  getRelatedProducts: async (category: string, currentId: string): Promise<Product[]> => {
    const res = await fetch(`${API_BASE_URL}/products/category/${category}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const products: Product[] = await res.json();
    return products
      .filter((item) => String(item.id) !== currentId)
      .slice(0, 4);
  },
};