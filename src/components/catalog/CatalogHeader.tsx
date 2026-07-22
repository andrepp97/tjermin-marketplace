'use client';

import { DesktopGridSwitcher, DesktopViewMode } from './DesktopGridSwitcher';

interface CatalogHeaderProps {
  title: string;
  productCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
  desktopView: DesktopViewMode;
  onDesktopViewChange: (mode: DesktopViewMode) => void;
}

export function CatalogHeader({
  title,
  productCount,
  sortBy,
  onSortChange,
  desktopView,
  onDesktopViewChange,
}: CatalogHeaderProps) {
  return (
    <div className="hidden lg:flex items-center justify-between pb-4 border-b border-slate-100 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Showing {productCount} products
        </p>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white text-slate-700 border border-slate-200 text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-slate-400 transition-all cursor-pointer shadow-sm"
        >
          <option value="default">Sort by: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rating</option>
        </select>

        <DesktopGridSwitcher viewMode={desktopView} onViewChange={onDesktopViewChange} />
      </div>
    </div>
  );
}