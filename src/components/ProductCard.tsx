'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Star, ChevronRight, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, CartItem } from '@/store/cartSlice';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const dispatch = useAppDispatch();
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'PROMO':
        return 'bg-emerald-500 text-white';
      case 'PREMIUM':
        return 'bg-slate-900 text-white';
      case 'BEST DEAL':
        return 'bg-amber-500 text-white';
      default:
        return 'hidden';
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 flex flex-col justify-between p-4 relative text-slate-900 group"
    >
      <div>
        {/* Badge Indicator */}
        {product.badge && (
          <span className={`absolute top-6 left-6 z-10 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase ${getBadgeStyle(product.badge)}`}>
            {product.badge}
          </span>
        )}

        {/* Product Image Container */}
        <div className="relative w-full h-52 bg-slate-50 rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.round(product.rating?.rate || 5)
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-200'
                }`}
            />
          ))}
        </div>

        {/* Title & Category */}
        <h3 className="font-bold text-slate-900 text-base line-clamp-1 mb-0.5">
          {product.title}
        </h3>
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          {product.category}
        </p>
        <p className="text-xs text-slate-500 line-clamp-2 mb-4">
          {product.description}
        </p>
      </div>

      {/* Footer / CTA Section */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="block text-[10px] text-slate-400">Starting at</span>
          <span className="text-base font-extrabold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`p-2 rounded-lg transition-colors ${isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700'
              }`}
            title="Add to Cart"
          >
            {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </motion.button>

          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors gap-0.5"
          >
            View <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};