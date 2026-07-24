import { useMemo } from 'react';
import { DesktopViewMode } from '@/components/catalog/DesktopGridSwitcher';

export function useCatalogLayout(
  mobileGridCols: 'compact' | 'standard',
  desktopView: DesktopViewMode
) {
  return useMemo(() => {
    const mobileCols = mobileGridCols === 'compact' ? 'grid-cols-2' : 'grid-cols-1';
    let desktopCols = 'lg:grid-cols-3';

    if (desktopView === 'dense') desktopCols = 'lg:grid-cols-4';
    if (desktopView === 'list') desktopCols = 'lg:grid-cols-1';

    return `grid gap-4 lg:gap-6 ${mobileCols} ${desktopCols}`;
  }, [mobileGridCols, desktopView]);
}