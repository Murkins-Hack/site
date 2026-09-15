import React from 'react';
import Magnetic from './react-bits/Magnetic';
import { CATEGORIES } from '../data/products';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
}) {
  return (
    <header className="top-nav sticky top-0 z-50 w-full bg-black/90 backdrop-blur-luxury border-b border-white/[0.08] transition-all">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: B / V — ARCHIVE (Sharp monospace, 13px, uppercase) */}
        <a
          href="#"
          className="brand-logo group flex items-center gap-2.5 text-white no-underline focus:outline-none"
        >
          <span className="w-2 h-2 bg-white inline-block group-hover:scale-125 transition-transform" />
          <span className="font-mono text-[13px] font-bold tracking-widest text-white uppercase select-none">
            B / V — ARCHIVE
          </span>
        </a>

        {/* Center: Filter Pills with Active States (White background, Black text) */}
        <nav className="filter-bar hidden md:flex items-center gap-1.5 p-1 border border-white/[0.08] bg-[#0d0d0d]/80 rounded-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <Magnetic key={cat.id} strength={0.2}>
                <button
                  onClick={() => onSelectCategory(cat.id)}
                  className={`relative px-3.5 py-1.5 font-mono text-[11px] sm:text-xs tracking-wider uppercase font-bold transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'bg-[#ffffff] text-[#000000] shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                      : 'bg-transparent text-[#888888] hover:text-[#ffffff] hover:bg-white/[0.06]'
                  }`}
                >
                  {cat.label}
                </button>
              </Magnetic>
            );
          })}
        </nav>

        {/* Right: Cart Button BAG [ 0 ] */}
        <div className="flex items-center gap-3">
          <Magnetic strength={0.25}>
            <button
              onClick={onOpenCart}
              className="cart-btn group relative flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#0d0d0d] hover:bg-white border border-white/[0.12] hover:border-white text-white hover:text-black font-mono text-xs tracking-widest uppercase transition-all duration-200 active:scale-95 focus:outline-none"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 group-hover:stroke-black transition-colors" />
              <span className="font-bold">BAG [ {cartCount} ]</span>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Mobile Filter Bar */}
      <div className="md:hidden flex items-center gap-1.5 px-4 py-2 border-t border-white/[0.06] overflow-x-auto no-scrollbar bg-black/95">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1 font-mono text-[10px] tracking-wider uppercase font-bold transition-colors ${
                isActive
                  ? 'bg-[#ffffff] text-[#000000]'
                  : 'bg-transparent text-[#888888] border border-white/[0.08]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
