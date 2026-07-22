import { useState, useMemo } from 'react';
import { DesktopViewMode } from '@/components/catalog/DesktopGridSwitcher';

export function useCatalogState() {
  const [category, setCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const [mobileGridCols, setMobileGridCols] = useState<'compact' | 'standard'>('compact');
  const [desktopView, setDesktopView] = useState<DesktopViewMode>('grid');

  const gridLayoutClass = useMemo(() => {
    const mobileCols = mobileGridCols === 'compact' ? 'grid-cols-2' : 'grid-cols-1';
    let desktopCols = 'lg:grid-cols-3';

    if (desktopView === 'dense') desktopCols = 'lg:grid-cols-4';
    if (desktopView === 'list') desktopCols = 'lg:grid-cols-1';

    return `grid gap-6 ${mobileCols} ${desktopCols}`;
  }, [mobileGridCols, desktopView]);

  const togglePriceRange = (val: string) => {
    setPriceRange((prev) => (prev === val ? 'all' : val));
  };

  const resetFilters = () => {
    setCategory('all');
    setPriceRange('all');
  };

  return {
    filters: { category, priceRange, sortBy },
    setCategory,
    setPriceRange,
    togglePriceRange,
    setSortBy,
    resetFilters,
    mobileFilter: {
      isOpen: isMobileFilterOpen,
      toggle: () => setIsMobileFilterOpen((prev) => !prev),
    },
    viewMode: {
      mobileGridCols,
      setMobileGridCols,
      desktopView,
      setDesktopView,
      gridLayoutClass,
    },
  };
}