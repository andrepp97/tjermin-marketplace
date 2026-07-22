import { Suspense } from 'react';
import { productService } from '@/services/productService';
import { filterAndSortProducts } from '@/utils/catalogHelpers';
import { formatCategoryName } from '@/utils/formatters';

import { HeroSection } from '@/components/HeroSection';
import { FilterSidebar } from '@/components/FilterSidebar';
import { MobileCatalogControls } from '@/components/catalog/MobileCatalogControls';
import { CatalogHeader } from '@/components/catalog/CatalogHeader';
import { CatalogGrid } from '@/components/catalog/CatalogGrid';
import { ProductSkeleton } from '@/components/ProductSkeleton';

interface PageProps {
  searchParams: Promise<{
    category?: string;
    priceRange?: string;
    sortBy?: string;
    view?: 'grid' | 'dense' | 'list';
  }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const {
    category = 'all',
    priceRange = 'all',
    sortBy = 'default',
    view = 'grid'
  } = await searchParams;

  const products = await productService.getProducts();
  const filteredProducts = filterAndSortProducts(products, {
    category,
    priceRange,
    sortBy,
  });
  const formattedCategoryName = formatCategoryName(category);

  const gridLayoutClass =
    view === 'dense' ? 'grid-cols-2 lg:grid-cols-4' :
      view === 'list' ? 'grid-cols-1' :
        'grid-cols-2 lg:grid-cols-3';

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeroSection />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 xl:px-0">
        <aside className="hidden lg:block w-64 shrink-0 sticky top-20 h-fit">
          <FilterSidebar
            selectedCategory={category}
            selectedPriceRange={priceRange}
          />
        </aside>

        <main className="flex-1 pb-16">
          <MobileCatalogControls
            category={category}
            priceRange={priceRange}
            sortBy={sortBy}
            formattedCategoryName={formattedCategoryName}
          />

          <CatalogHeader
            title={formattedCategoryName}
            totalCount={filteredProducts.length}
            currentSort={sortBy}
            currentView={view}
          />

          <Suspense fallback={<CatalogGridSkeleton />}>
            <CatalogGrid
              products={filteredProducts}
              gridLayoutClass={`grid gap-6 ${gridLayoutClass}`}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function CatalogGridSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}