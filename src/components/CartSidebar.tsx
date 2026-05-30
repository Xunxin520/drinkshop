'use client';

import { useCartStore } from '@/lib/store';

export default function CartSidebar() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.total);
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          onClick={closeCart}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <h3 className="text-lg font-bold text-zinc-900">购物车</h3>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="关闭"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 text-zinc-400">
              <span className="text-5xl">🛒</span>
              <p className="mt-3">购物车是空的</p>
              <p className="text-sm mt-1">快去挑选喜欢的饮品吧</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 py-3 border-b border-zinc-50">
                <span className="text-4xl select-none">{item.product.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-zinc-900 text-sm">{item.product.name}</h4>
                  <p className="text-xs text-zinc-500">{item.product.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-rose-500 text-sm">¥{item.product.price}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-zinc-300 hover:text-rose-400 transition-colors cursor-pointer self-start"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-zinc-100 px-6 py-4 space-y-3">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium text-zinc-600">合计</span>
              <span className="font-bold text-zinc-900">¥{total()}</span>
            </div>
            <a
              href="/checkout"
              className="block text-center w-full py-3 rounded-xl bg-zinc-900 text-white font-medium text-sm hover:bg-zinc-800 transition-colors"
            >
              去结算
            </a>
            <button
              onClick={clearCart}
              className="w-full text-center text-sm text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
            >
              清空购物车
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
