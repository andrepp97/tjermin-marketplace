export const getProductBadges = (productId: number | string): string[] => {
  const numericId = typeof productId === 'number' ? productId : parseInt(productId, 10) || 1;
  const mod = numericId % 4;

  switch (mod) {
    case 1:
      return ['BEST DEAL', 'PROMO'];
    case 2:
      return ['PROMO'];
    case 3:
      return ['BEST DEAL'];
    default:
      return [];
  }
};