import { Product } from '@/types/product';

export interface CatalogFilterOptions {
  category?: string;
  priceRange?: string;
  sortBy?: string;
}

const normalizeString = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

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
      const productCatNormalized = normalizeString(product.category || '');
      const targetCatNormalized = normalizeString(category);

      if (productCatNormalized !== targetCatNormalized) {
        return false;
      }
    }
    if (priceRange && priceRange !== 'all') {
      const price = Number(product.price);
      if (isNaN(price)) return false;

      switch (priceRange) {
        case '0-50':
        case 'under-50':
          if (!(price >= 0 && price <= 50)) return false;
          break;
        case '50-100':
          if (!(price > 50 && price <= 100)) return false;
          break;
        case '100-250':
          if (!(price > 100 && price <= 250)) return false;
          break;
        case '250-plus':
        case 'above-250':
          if (!(price > 250)) return false;
          break;
      }
    }

    return true;
  });

  return filtered.sort((a, b) => {
    const priceA = Number(a.price) || 0;
    const priceB = Number(b.price) || 0;

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') {
      const ratingA = a.rating?.rate || 0;
      const ratingB = b.rating?.rate || 0;
      return ratingB - ratingA;
    }

    return 0; // Default
  });
}