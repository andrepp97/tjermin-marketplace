import { Product } from '@/types/product';

interface CatalogFilterOptions {
  category?: string;
  priceRange?: string;
  sortBy?: string;
}

export function filterAndSortProducts(
  products: Product[],
  { category = 'all', priceRange = 'all', sortBy = 'default' }: CatalogFilterOptions
): Product[] {
  return products
    .filter((product) => {
      if (category !== 'all' && product.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }

      if (priceRange !== 'all') {
        const [minStr, maxStr] = priceRange.split('-');
        const min = Number(minStr);
        const max = maxStr ? Number(maxStr) : Infinity;

        if (product.price < min || product.price > max) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
      return 0;
    });
}