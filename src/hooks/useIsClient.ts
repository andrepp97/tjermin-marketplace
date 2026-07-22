import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => { };

export function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Snapshot saat di Client Browser
    () => false  // Snapshot saat di Server (SSR)
  );
}