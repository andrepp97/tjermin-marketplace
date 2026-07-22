'use client';

import { useProducts } from '@/hooks/useProducts';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useCatalogState } from '@/hooks/useCatalogState';
import { formatCategoryName } from '@/utils/formatters';

import { HeroSection } from '@/components/HeroSection';
import { FilterSidebar } from '@/components/FilterSidebar';
import { MobileCatalogControls } from '@/components/catalog/MobileCatalogControls';
import { CatalogHeader } from '@/components/catalog/CatalogHeader';
import { CatalogGrid } from '@/components/catalog/CatalogGrid';

export default function CatalogPage() {
  const { data: products, isLoading, isError } = useProducts();
  const {
    filters,
    setCategory,
    togglePriceRange,
    setSortBy,
    resetFilters,
    mobileFilter,
    viewMode,
  } = useCatalogState();

  const filteredProducts = useFilteredProducts(products, filters);
  const formattedCategoryName = formatCategoryName(filters.category);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-16">
      <HeroSection />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 xl:px-0">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-20 h-fit">
          <FilterSidebar
            selectedCategory={filters.category}
            onSelectCategory={setCategory}
            selectedPriceRange={filters.priceRange}
            onSelectPriceRange={togglePriceRange}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <MobileCatalogControls
            category={filters.category}
            priceRange={filters.priceRange}
            sortBy={filters.sortBy}
            formattedCategoryName={formattedCategoryName}
            isFilterOpen={mobileFilter.isOpen}
            mobileGridCols={viewMode.mobileGridCols}
            onToggleFilter={mobileFilter.toggle}
            onSelectCategory={setCategory}
            onSelectPriceRange={togglePriceRange}
            onSortChange={setSortBy}
            onGridColsChange={viewMode.setMobileGridCols}
          />

          <CatalogHeader
            title={formattedCategoryName}
            totalCount={filteredProducts.length}
            sortBy={filters.sortBy}
            onSortChange={setSortBy}
            desktopView={viewMode.desktopView}
            onViewChange={viewMode.setDesktopView}
          />

          <CatalogGrid
            products={filteredProducts}
            isLoading={isLoading}
            isError={isError}
            gridLayoutClass={viewMode.gridLayoutClass}
            onResetFilters={resetFilters}
          />

          {/* Show More */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="mt-12 text-center">
              <button className="px-8 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-all shadow-sm hover:border-slate-300">
                Show More Products
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}