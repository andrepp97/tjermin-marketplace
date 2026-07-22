'use client';

import { useUpdateQuery } from '@/hooks/useUpdateQuery';
import { DesktopGridSwitcher, DesktopViewMode } from './DesktopGridSwitcher';

interface CatalogHeaderProps {
  title: string;
  totalCount: number;
  currentSort: string;
  currentView: DesktopViewMode;
}

export function CatalogHeader({
  title,
  totalCount,
  currentSort,
  currentView,
}: CatalogHeaderProps) {
  const { updateQuery } = useUpdateQuery();

  return (
    <div className="hidden lg:flex items-center justify-between pb-4 border-b border-slate-100 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-xs text-slate-500 mt-0.5">Showing {totalCount} products</p>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={currentSort}
          onChange={(e) => updateQuery('sortBy', e.target.value)}
          className="bg-white text-slate-700 border border-slate-200 text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-slate-400 transition-all cursor-pointer shadow-sm"
        >
          <option value="default">Sort by: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rating</option>
        </select>

        <DesktopGridSwitcher
          viewMode={currentView}
          onViewChange={(mode) => updateQuery('view', mode)}
        />
      </div>
    </div>
  );
}