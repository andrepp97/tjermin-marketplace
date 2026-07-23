'use client';

import { useState, useCallback } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useCatalogLayout } from '@/hooks/useCatalogLayout';
import { formatCategoryName } from '@/utils/formatters';

import { HeroSection } from '@/components/HeroSection';
import { FilterSidebar } from '@/components/FilterSidebar';
import { MobileCatalogControls } from '@/components/catalog/MobileCatalogControls';
import { DesktopViewMode } from '@/components/catalog/DesktopGridSwitcher';
import { CatalogHeader } from '@/components/catalog/CatalogHeader';
import { CatalogGrid } from '@/components/catalog/CatalogGrid';

export default function CatalogPage() {
  const { data: products, isLoading, isError } = useProducts();

  // Filter States
  const [category, setCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  // View Switcher States
  const [mobileGridCols, setMobileGridCols] = useState<'compact' | 'standard'>('compact');
  const [desktopView, setDesktopView] = useState<DesktopViewMode>('grid');

  // Custom Hooks & Utils
  const filteredProducts = useFilteredProducts(products, { category, priceRange, sortBy });
  const formattedCategoryName = formatCategoryName(category);
  const gridLayoutClass = useCatalogLayout(mobileGridCols, desktopView);

  // Memoized Handlers
  const handleTogglePriceRange = useCallback((val: string) => {
    setPriceRange((prev) => (prev === val ? 'all' : val));
  }, []);

  const handleResetFilters = useCallback(() => {
    setCategory('all');
    setPriceRange('all');
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-12">
      <HeroSection />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 xl:px-0">
        <aside className="hidden lg:block w-64 shrink-0 sticky top-20 h-fit">
          <FilterSidebar
            selectedCategory={category}
            onSelectCategory={setCategory}
            selectedPriceRange={priceRange}
            onSelectPriceRange={handleTogglePriceRange}
          />
        </aside>

        <main className="flex-1">
          <MobileCatalogControls
            category={category}
            priceRange={priceRange}
            sortBy={sortBy}
            formattedCategoryName={formattedCategoryName}
            mobileGridCols={mobileGridCols}
            onSelectCategory={setCategory}
            onSelectPriceRange={handleTogglePriceRange}
            onSortChange={setSortBy}
            onGridColsChange={setMobileGridCols}
          />

          <CatalogHeader
            title={formattedCategoryName}
            productCount={filteredProducts.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            desktopView={desktopView}
            onDesktopViewChange={setDesktopView}
          />

          <CatalogGrid
            products={filteredProducts}
            isLoading={isLoading}
            isError={isError}
            gridLayoutClass={gridLayoutClass}
            onResetFilters={handleResetFilters}
          />
        </main>
      </div>
    </div>
  );
}