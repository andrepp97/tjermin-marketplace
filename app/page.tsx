'use client';

import { useState, useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { formatCategoryName } from '@/utils/formatters';

import { HeroSection } from '@/components/HeroSection';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { FilterSidebar } from '@/components/FilterSidebar';
import { MobileCatalogControls } from '@/components/catalog/MobileCatalogControls';
import { DesktopGridSwitcher, DesktopViewMode } from '@/components/catalog/DesktopGridSwitcher';

export default function CatalogPage() {
  const { data: products, isLoading, isError } = useProducts();

  // Filter & Layout States
  const [category, setCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // View Switcher States
  const [mobileGridCols, setMobileGridCols] = useState<'compact' | 'standard'>('compact');
  const [desktopView, setDesktopView] = useState<DesktopViewMode>('grid');

  // Custom Hooks & Utils
  const filteredProducts = useFilteredProducts(products, { category, priceRange, sortBy });
  const formattedCategoryName = formatCategoryName(category);

  // Dynamic Tailwind Grid Classes
  const gridLayoutClass = useMemo(() => {
    const mobileCols = mobileGridCols === 'compact' ? 'grid-cols-2' : 'grid-cols-1';
    let desktopCols = 'lg:grid-cols-3';

    if (desktopView === 'dense') desktopCols = 'lg:grid-cols-4';
    if (desktopView === 'list') desktopCols = 'lg:grid-cols-1';

    return `grid gap-6 ${mobileCols} ${desktopCols}`;
  }, [mobileGridCols, desktopView]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeroSection />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 xl:px-0">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-20 h-fit">
          <FilterSidebar
            selectedCategory={category}
            onSelectCategory={setCategory}
            selectedPriceRange={priceRange}
            onSelectPriceRange={(val) => setPriceRange(priceRange === val ? 'all' : val)}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <MobileCatalogControls
            category={category}
            priceRange={priceRange}
            sortBy={sortBy}
            formattedCategoryName={formattedCategoryName}
            isFilterOpen={isMobileFilterOpen}
            mobileGridCols={mobileGridCols}
            onToggleFilter={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            onSelectCategory={setCategory}
            onSelectPriceRange={(val) => setPriceRange(priceRange === val ? 'all' : val)}
            onSortChange={setSortBy}
            onGridColsChange={setMobileGridCols}
          />

          <div className="hidden lg:flex items-center justify-between pb-4 border-b border-slate-100 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{formattedCategoryName}</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white text-slate-700 border border-slate-200 text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-slate-400 transition-all cursor-pointer shadow-sm"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>

              <DesktopGridSwitcher viewMode={desktopView} onViewChange={setDesktopView} />
            </div>
          </div>

          {/* Error State */}
          {isError && (
            <div className="p-6 text-center bg-red-50 border border-red-200 rounded-2xl text-red-600 my-4">
              Gagal memuat produk. Silakan periksa koneksi Anda dan coba lagi.
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && !isError && (
            <div className="py-16 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl my-4">
              <p className="text-slate-500 font-medium text-sm">
                Tidak ada produk yang sesuai dengan filter pilihan Anda.
              </p>
              <button
                onClick={() => {
                  setCategory('all');
                  setPriceRange('all');
                }}
                className="mt-3 text-xs font-bold text-slate-900 underline hover:text-slate-700"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className={gridLayoutClass}>
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
              : filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 4}
                />
              ))}
          </div>

          {/* Show More */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="my-12 text-center">
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