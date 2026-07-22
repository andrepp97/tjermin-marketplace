export const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 animate-pulse flex flex-col justify-between">
      <div>
        <div className="w-full h-52 bg-slate-200 rounded-xl mb-4" />
        <div className="w-24 h-3 bg-slate-200 rounded mb-2" />
        <div className="w-3/4 h-4 bg-slate-200 rounded mb-2" />
        <div className="w-1/2 h-3 bg-slate-200 rounded mb-4" />
        <div className="w-full h-8 bg-slate-100 rounded mb-2" />
      </div>
      <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
        <div className="w-16 h-4 bg-slate-200 rounded" />
        <div className="w-12 h-6 bg-slate-200 rounded" />
      </div>
    </div>
  );
};