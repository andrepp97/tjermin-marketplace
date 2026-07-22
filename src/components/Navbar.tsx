'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, User } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { useIsClient } from '@/hooks/useIsClient';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Inventory', href: '#' },
  { label: 'Financing', href: '#' },
  { label: 'Contact', href: '#' },
];

export const Navbar = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isClient = useIsClient();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 xl:px-0 h-16 flex items-center justify-between">

        <div className="flex items-center gap-10">
          <Link href="/" className="font-bold text-xl tracking-wider text-[#1A365D]">
            TJERMIN
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm font-medium" role="menubar">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                      className={`transition-colors ${isActive
                        ? 'text-[#1A365D] font-semibold'
                        : 'text-slate-500 hover:text-[#1A365D]'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-5 text-slate-700">
          <button className="hover:text-slate-900 transition-colors p-1" title="Search">
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          <button className="hover:text-slate-900 transition-colors p-1" title="Account">
            <User className="w-5 h-5 stroke-[1.8]" />
          </button>

          <Link href="/cart" className="relative p-1 hover:text-slate-900 transition-colors">
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {isClient && totalQuantity > 0 && (
              <motion.span
                key={totalQuantity}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className="absolute -top-1.5 -right-2 bg-[#1E293B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {totalQuantity}
              </motion.span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};