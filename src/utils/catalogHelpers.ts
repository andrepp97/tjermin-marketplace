import { Product } from '@/types/product';

export interface CatalogFilterOptions {
  category?: string;
  priceRange?: string;
  sortBy?: string;
}

const normalizeString = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]/g, '');

export function filterAndSortProducts(
  products: Product[],
  options: CatalogFilterOptions
): Product[] {
  if (!Array.isArray(products)) return [];

  const {
    category = 'all',
    priceRange = 'all',
    sortBy = 'default'
  } = options;

  const filtered = products.filter((product) => {
    if (category && category !== 'all') {
      const productCat = normalizeString(product.category || '');
      const targetCat = normalizeString(category);

      if (productCat !== targetCat) {
        return false;
      }
    }

    if (priceRange && priceRange !== 'all') {
      const price = Number(product.price);

      if (isNaN(price)) return false;

      if (priceRange === '0-50' && !(price >= 0 && price <= 50)) return false;
      if (priceRange === '50-100' && !(price > 50 && price <= 100)) return false;
      if (priceRange === '100-250' && !(price > 100 && price <= 250)) return false;
      if (priceRange === '250-plus' && !(price > 250)) return false;
    }

    return true;
  });

  return filtered.sort((a, b) => {
    const priceA = Number(a.price) || 0;
    const priceB = Number(b.price) || 0;

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') {
      const ratingA = typeof a.rating === 'object' && a.rating !== null ? a.rating.rate : 0;
      const ratingB = typeof b.rating === 'object' && b.rating !== null ? b.rating.rate : 0;
      return ratingB - ratingA;
    }

    return 0;
  });
}