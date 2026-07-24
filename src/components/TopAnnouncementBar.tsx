'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TopAnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="w-full bg-[#F8FAFC] border-b border-slate-200/70 text-slate-800 text-xs sm:text-sm overflow-hidden z-50 relative"
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              aria-label="Close announcement"
              className="p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer mr-1"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-center">
              <span className="font-bold text-[#0B1120]">
                Premium Selection
              </span>
              <span className="text-slate-400 font-normal hidden sm:inline">
                —
              </span>
              <span className="text-slate-600 font-normal">
                Free Shipping on Orders Over Rp 500.000
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-0.5 font-semibold text-[#1C355E] hover:text-[#0B1120] transition-colors ml-1 sm:ml-2"
            >
              <span>Shop All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};