export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  badge?: 'PROMO' | 'PREMIUM' | 'BEST DEAL';
  quantity: number;
}

export interface FilterState {
  category: string;
  priceRange: string;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'rating';
}