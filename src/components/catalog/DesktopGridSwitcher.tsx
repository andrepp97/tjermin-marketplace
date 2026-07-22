'use client';

import React from 'react';
import { Grid3X3, Grid2X2, List } from 'lucide-react';

export type DesktopViewMode = 'dense' | 'grid' | 'list';

interface DesktopGridSwitcherProps {
  viewMode: DesktopViewMode;
  onViewChange: (mode: DesktopViewMode) => void;
}

export const DesktopGridSwitcher: React.FC<DesktopGridSwitcherProps> = ({
  viewMode,
  onViewChange,
}) => {
  return (
    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden divide-x divide-slate-200 bg-white shadow-sm">
      <button
        onClick={() => onViewChange('dense')}
        className={`p-2.5 transition-colors ${viewMode === 'dense'
            ? 'bg-slate-100 text-[#1E293B]'
            : 'text-slate-400 hover:text-slate-600 bg-white'
          }`}
        title="Dense Grid (4 Columns)"
      >
        <Grid3X3 className="w-4.5 h-4.5 stroke-2" />
      </button>

      <button
        onClick={() => onViewChange('grid')}
        className={`p-2.5 transition-colors ${viewMode === 'grid'
            ? 'bg-slate-100 text-[#1E293B]'
            : 'text-slate-400 hover:text-slate-600 bg-white'
          }`}
        title="Standard Grid (3 Columns)"
      >
        <Grid2X2 className="w-4.5 h-4.5 stroke-2" />
      </button>

      <button
        onClick={() => onViewChange('list')}
        className={`p-2.5 transition-colors ${viewMode === 'list'
            ? 'bg-slate-100 text-[#1E293B]'
            : 'text-slate-400 hover:text-slate-600 bg-white'
          }`}
        title="List View"
      >
        <List className="w-4.5 h-4.5 stroke-2" />
      </button>
    </div>
  );
};