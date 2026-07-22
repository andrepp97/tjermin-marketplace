'use client';

import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Check, Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart, CartItem } from '@/store/cartSlice';
import { Product } from '@/types/product';

interface ProductActionsProps {
  product: Product;
}

export const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity,
    };

    dispatch(addToCart(cartItem));

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* 1. Quantity Counter */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-2">
          Quantity
        </label>
        <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50/50 p-1">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span className="w-12 text-center text-sm font-bold text-slate-900 select-none">
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Action Buttons (Add to Cart & Wishlist) */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] ${isAdded
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" /> Added to Cart!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </>
          )}
        </button>

        <button
          type="button"
          className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/50 transition-all"
          aria-label="Add to Wishlist"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};