'use client';

import { useState } from 'react';
import { Filter, SlidersHorizontal, Grid, Square } from 'lucide-react';

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
  { label: 'All Prices', value: 'all' },
  { label: '$0 - $50', value: '0-50' },
  { label: '$50 - $100', value: '50-100' },
  { label: '$100 - $250', value: '100-250' },
  { label: '$250+', value: '250-plus' },
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

  const handleGridToggle = () => {
    const nextMode = mobileGridCols === 'compact' ? 'standard' : 'compact';
    onGridColsChange(nextMode);
  };

  return (
    <div className="block lg:hidden mb-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{formattedCategoryName}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGridToggle}
            className="p-2 border border-slate-200 rounded-xl text-slate-700 bg-white cursor-pointer"
            aria-label="Toggle Grid View"
          >
            {mobileGridCols === 'compact' ? (
              <Grid className="w-5 h-5" />
            ) : (
              <Square className="w-5 h-5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2 text-lg font-bold">
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>Filter & Sort</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
                >
                  ✕
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
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${category === cat.value
                          ? 'bg-slate-900 text-white font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
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
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${priceRange === range.value
                          ? 'bg-slate-900 text-white font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
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
              className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl mt-6 cursor-pointer hover:bg-slate-800 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}