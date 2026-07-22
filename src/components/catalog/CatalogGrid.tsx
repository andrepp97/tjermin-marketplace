'use client';

import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { useUpdateQuery } from '@/hooks/useUpdateQuery';

interface CatalogGridProps {
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
  gridLayoutClass?: string;
  onResetFilters?: () => void;
}

export function CatalogGrid({
  products,
  isLoading = false,
  isError = false,
  gridLayoutClass = 'grid gap-6 grid-cols-2 lg:grid-cols-3',
  onResetFilters,
}: CatalogGridProps) {
  const { updateQuery } = useUpdateQuery();

  const handleReset = () => {
    if (onResetFilters) {
      onResetFilters();
    } else {
      updateQuery('category', 'all');
      updateQuery('priceRange', 'all');
    }
  };

  if (isError) {
    return (
      <div className="p-6 text-center bg-red-50 border border-red-200 rounded-2xl text-red-600 my-4">
        Gagal memuat produk. Silakan periksa koneksi Anda dan coba lagi.
      </div>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <div className="py-16 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl my-4">
        <p className="text-slate-500 font-medium text-sm">
          Tidak ada produk yang sesuai dengan filter pilihan Anda.
        </p>
        <button
          onClick={handleReset}
          className="mt-3 text-xs font-bold text-slate-900 underline hover:text-slate-700"
        >
          Reset Filter
        </button>
      </div>
    );
  }

  return (
    <div className={gridLayoutClass}>
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
        : products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 6}
          />
        ))}
    </div>
  );
}