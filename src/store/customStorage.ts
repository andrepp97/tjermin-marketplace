import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// Storage dummy untuk SSR
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Gunakan localStorage jika di client-side, dan noopStorage jika di server
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

export default storage;