'use client';

import { useCartStore } from '@/lib/store';

export default function Navbar() {
  const count = useCartStore((s) => s.count);
  const toggleCart = useCartStore((s) => s.toggleCart);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        <a href="/" className="text-xl font-bold text-zinc-900 tracking-tight">
          DrinkShop
        </a>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
          <a href="/#hero" className="hover:text-zinc-900 transition-colors">首页</a>
          <a href="/#products" className="hover:text-zinc-900 transition-colors">产品</a>
          <a href="/#categories" className="hover:text-zinc-900 transition-colors">分类</a>
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="购物车"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {count()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
