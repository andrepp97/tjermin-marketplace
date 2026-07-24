'use client';

import { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, Grid, Square, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileCatalogControlsProps {
  category: string;
  priceRange: string;
  sortBy: string;
  formattedCategoryName: string;
  mobileGridCols?: 'compact' | 'standard';
  onSelectCategory: (category: string) => void;
  onSelectPriceRange: (range: string) => void;
  onSortChange: (sort: string) => void;
  onGridColsChange: (cols: 'compact' | 'standard') => void;
}

const CATEGORIES = [
  { label: 'All Categories', value: 'all' },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: 'Jewelery', value: 'jewelery' },
  { label: 'Electronics', value: 'electronics' },
];

const PRICE_RANGES = [
  { label: 'Semua Harga', value: 'all' },
  { label: 'Rp 0 - Rp 750.000', value: '0-50' },
  { label: 'Rp 750.000 - Rp 1.500.000', value: '50-100' },
  { label: 'Rp 1.500.000 - Rp 3.750.000', value: '100-250' },
  { label: 'Rp 3.750.000+', value: '250-plus' },
];

export function MobileCatalogControls({
  category,
  priceRange,
  sortBy,
  formattedCategoryName,
  mobileGridCols = 'compact',
  onSelectCategory,
  onSelectPriceRange,
  onSortChange,
  onGridColsChange,
}: MobileCatalogControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Scroll lock when drawer active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleGridToggle = () => {
    const nextMode = mobileGridCols === 'compact' ? 'standard' : 'compact';
    onGridColsChange(nextMode);
  };

  return (
    <div className="block lg:hidden mb-6">
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{formattedCategoryName}</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid View Toggle */}
          <button
            type="button"
            onClick={handleGridToggle}
            className="p-2 border border-slate-200 rounded-xl text-slate-700 bg-white active:scale-95 transition-transform cursor-pointer"
            aria-label="Toggle Grid View"
          >
            {mobileGridCols === 'compact' ? (
              <Grid className="w-5 h-5" />
            ) : (
              <Square className="w-5 h-5" />
            )}
          </button>

          {/* Filter Trigger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold active:scale-95 transition-transform cursor-pointer shadow-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              style={{ transform: 'translateZ(0)' }}
              className="relative z-10 w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between shadow-xl will-change-transform"
            >
              <div className="space-y-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    <SlidersHorizontal className="w-5 h-5 text-slate-700" />
                    <span>Filter & Sort</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="Close Filter"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Sort By
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl p-3 text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="default">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </div>

                {/* Category Options */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => onSelectCategory(cat.value)}
                        className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${category === cat.value
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'text-slate-600 hover:bg-slate-100 font-medium'
                          }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Options */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    {PRICE_RANGES.map((range) => (
                      <button
                        key={range.value}
                        type="button"
                        onClick={() => onSelectPriceRange(range.value)}
                        className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${priceRange === range.value
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'text-slate-600 hover:bg-slate-100 font-medium'
                          }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl mt-6 cursor-pointer hover:bg-slate-800 active:scale-[0.99] transition-all shadow-md"
              >
                Apply Filters
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}