'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGallerySliderProps {
  images: string[];
  productTitle: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export const ImageGallerySlider: React.FC<ImageGallerySliderProps> = ({
  images,
  productTitle,
}) => {
  const [[currentIndex, direction], setPage] = useState<[number, number]>([0, 0]);

  const paginate = (newDirection: number) => {
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setPage([newIndex, newDirection]);
  };

  const selectImage = (index: number) => {
    const newDir = index > currentIndex ? 1 : -1;
    setPage([index, newDir]);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 group shadow-sm">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000 || offset.x < -100) paginate(1);
              else if (swipe > 10000 || offset.x > 100) paginate(-1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              fill
              src={images[currentIndex]}
              alt={`${productTitle} view ${currentIndex + 1}`}
              className="object-cover object-center select-none"
              priority={currentIndex === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrow Controls */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-md shadow-md flex items-center justify-center text-slate-800 transition-transform active:scale-90 z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => paginate(1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-md shadow-md flex items-center justify-center text-slate-800 transition-transform active:scale-90 z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicator Counter */}
        <div className="absolute bottom-4 right-4 bg-slate-900/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium z-10">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {images.map((imgUrl, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => selectImage(idx)}
              className={`relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all ${isActive
                ? 'border-slate-900 ring-2 ring-slate-900/10'
                : 'border-transparent opacity-70 hover:opacity-100'
                }`}
            >
              <Image
                fill
                src={imgUrl}
                alt={`Thumbnail ${idx + 1}`}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};