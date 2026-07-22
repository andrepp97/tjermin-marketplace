'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Runtime Server Error:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-8 text-center">
      <h2 className="text-xl font-bold text-red-600 mb-2">Gagal Memuat Produk</h2>
      <p className="text-gray-600 mb-4">{error.message || 'Terjadi kesalahan pada server.'}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Coba Lagi
      </button>
    </div>
  );
}