export default function LoadingProductDetail() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      {/* Skeleton Header / Breadcrumb */}
      <div className="h-6 w-32 bg-slate-200 rounded-lg mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Skeleton Gambar Utama */}
        <div className="aspect-square bg-slate-200 rounded-2xl w-full" />

        {/* Skeleton Detail Info */}
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-slate-200 rounded-xl" />
          <div className="h-6 w-1/4 bg-slate-200 rounded-xl" />
          <div className="h-24 w-full bg-slate-200 rounded-xl mt-6" />
          <div className="h-12 w-40 bg-slate-200 rounded-xl mt-8" />
        </div>
      </div>
    </div>
  );
}