'use client';

import React from 'react';
import { Filter } from 'lucide-react';

interface FilterSidebarProps {
  selectedCategory: string;
  selectedPriceRange: string;
  onSelectCategory: (category: string) => void;
  onSelectPriceRange: (range: string) => void;
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
  { label: 'Rp 0 - Rp 750.000', value: '0-50' },
  { label: 'Rp 750.000 - Rp 1.500.000', value: '50-100' },
  { label: 'Rp 1.500.000 - Rp 3.750.000', value: '100-250' },
  { label: 'Rp 3.750.000+', value: '250-plus' },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  selectedPriceRange,
  onSelectCategory,
  onSelectPriceRange,
}) => {
  return (
    <div className="w-full lg:w-64 space-y-8">
      <div className="flex items-center gap-2 text-xl font-bold text-slate-800">
        <Filter className="w-6 h-6" />
        <span>Filters</span>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
          CATEGORY
        </h3>
        <ul className="space-y-3">
          {CATEGORIES.map((cat) => (
            <li key={cat.value}>
              <button
                type="button"
                onClick={() => onSelectCategory(cat.value)}
                className={`text-left w-full transition-colors cursor-pointer ${selectedCategory === cat.value
                    ? 'font-bold text-slate-900 underline underline-offset-8 decoration-2'
                    : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
          PRICE RANGE
        </h3>
        <div className="space-y-3">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.value}
              className="flex items-center justify-between text-slate-600 cursor-pointer hover:text-slate-900"
            >
              <span>{range.label}</span>
              <input
                type="checkbox"
                checked={selectedPriceRange === range.value}
                onChange={() => onSelectPriceRange(range.value)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};