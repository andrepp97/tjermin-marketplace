export const formatCategoryName = (category: string): string => {
  if (category === 'all') return 'All Category';
  return category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatIDR = (amount: number): string => {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);

  // Replace karakter spasi khusus Unicode menjadi spasi reguler
  return formatted.replace(/[\u00A0\u202F]/g, ' ');
};

export const formatPriceFromUSD = (priceUSD: number, rate = 15000): string => {
  return formatIDR(priceUSD * rate);
};

export const formatOriginalPriceFromUSD = (
  priceUSD: number,
  rate = 15000,
  markup = 1.15
): string => {
  return formatIDR(priceUSD * rate * markup);
};