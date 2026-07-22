'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsClient } from '@/hooks/useIsClient';

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const isClient = useIsClient();

  if (!isClient) return null;

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-20 px-4 text-center">
        <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
        <p className="text-slate-500 text-sm mb-6">
          Looks like you haven&apos;t added any items to your catalog cart yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-slate-800" /> Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 items-center shadow-sm"
              >
                <div className="relative w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl shrink-0 p-2">
                  <Image
                    fill
                    src={item.image}
                    alt={item.title}
                    className="object-contain p-1"
                    sizes="80px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 truncate mb-1">
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-400 capitalize block mb-2">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-slate-900 w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit space-y-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-900 font-medium">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-bold text-slate-900">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-3.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 font-bold text-white text-sm transition-all shadow-sm">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}