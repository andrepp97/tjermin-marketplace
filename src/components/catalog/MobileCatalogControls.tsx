'use client';

import React from 'react';
import { SlidersHorizontal, ChevronDown, Grid3X3, Grid2X2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterSidebar } from '@/components/FilterSidebar';

interface MobileCatalogControlsProps {
  category: string;
  priceRange: string;
  sortBy: string;
  formattedCategoryName: string;
  isFilterOpen: boolean;
  mobileGridCols: 'compact' | 'standard';
  onToggleFilter: () => void;
  onSelectCategory: (cat: string) => void;
  onSelectPriceRange: (range: string) => void;
  onSortChange: (sort: string) => void;
  onGridColsChange: (cols: 'compact' | 'standard') => void;
}

export const MobileCatalogControls: React.FC<MobileCatalogControlsProps> = ({
  category,
  priceRange,
  sortBy,
  formattedCategoryName,
  isFilterOpen,
  mobileGridCols,
  onToggleFilter,
  onSelectCategory,
  onSelectPriceRange,
  onSortChange,
  onGridColsChange,
}) => {
  return (
    <div className="lg:hidden mb-6 space-y-4">
      {/* Expandable Filter Button */}
      <button
        onClick={onToggleFilter}
        className="w-full py-3.5 px-4 border-2 border-[#1E293B] rounded-2xl flex items-center justify-center gap-2.5 text-[#1E293B] font-semibold text-base hover:bg-slate-50 active:scale-[0.99] transition-all"
      >
        <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
        <span>Filters & Sort</span>
      </button>

      {/* Expandable Mobile Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm"
          >
            <FilterSidebar
              selectedCategory={category}
              onSelectCategory={onSelectCategory}
              selectedPriceRange={priceRange}
              onSelectPriceRange={onSelectPriceRange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          {formattedCategoryName}
        </h1>
      </div>

      {/* Sub-Header Row */}
      <div className="flex items-center justify-between pt-1">
        <div className="relative flex items-center gap-1.5 cursor-pointer group">
          <span className="text-sm font-semibold text-[#0F172A]">Sort by</span>
          <ChevronDown className="w-4 h-4 text-[#0F172A] stroke-[2.5]" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          >
            <option value="default">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex items-center bg-slate-100/70 border border-slate-200/80 rounded-xl p-1 gap-0.5">
          <button
            onClick={() => onGridColsChange('compact')}
            className={`p-1.5 rounded-lg transition-all ${mobileGridCols === 'compact'
              ? 'bg-white shadow-sm text-[#0F172A]'
              : 'text-slate-400 hover:text-slate-600'
              }`}
            title="2 Column View"
          >
            <Grid3X3 className="w-4 h-4 stroke-2" />
          </button>
          <button
            onClick={() => onGridColsChange('standard')}
            className={`p-1.5 rounded-lg transition-all ${mobileGridCols === 'standard'
              ? 'bg-white shadow-sm text-[#0F172A]'
              : 'text-slate-400 hover:text-slate-600'
              }`}
            title="Single Column View"
          >
            <Grid2X2 className="w-4 h-4 stroke-2" />
          </button>
        </div>
      </div>
    </div>
  );
};