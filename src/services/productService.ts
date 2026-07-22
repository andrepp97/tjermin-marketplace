import { Product } from '@/types/product';

const BASE_URL = 'https://fakestoreapi.com';

export const productService = {
  getProductById: async (id: string): Promise<Product | null> => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 }, // 1 jam
    });

    if (!res.ok) return null;
    return res.json();
  },

  getRelatedProducts: async (category: string, currentId: string): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/products/category/${category}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const products: Product[] = await res.json();
    return products
      .filter((item) => String(item.id) !== currentId)
      .slice(0, 4);
  },
};