import { useMemo } from 'react';
import { Product } from '@/types/product';

interface FilterOptions {
  category: string;
  priceRange: string;
  sortBy: string;
}

export const useFilteredProducts = (
  products: Product[] | undefined,
  { category, priceRange, sortBy }: FilterOptions
) => {
  return useMemo(() => {
    if (!products) return [];

    return products
      .filter((p) => (category === 'all' ? true : p.category === category))
      .filter((p) => {
        if (priceRange === '0-50') return p.price <= 50;
        if (priceRange === '50-100') return p.price > 50 && p.price <= 100;
        if (priceRange === '100-250') return p.price > 100 && p.price <= 250;
        if (priceRange === '250-plus') return p.price > 250;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
        return 0;
      });
  }, [products, category, priceRange, sortBy]);
};