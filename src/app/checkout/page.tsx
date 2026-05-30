'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('创建订单失败，请重试');
      }
    } catch {
      alert('创建订单失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="text-2xl font-bold text-zinc-900 mt-4">购物车是空的</h1>
        <p className="text-zinc-500 mt-2">先去逛逛再回来结算吧</p>
        <Link href="/" className="inline-block mt-6 px-8 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors">
          回到首页
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-zinc-900 mb-8">确认订单</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-4 py-4 border-b border-zinc-100">
            <span className="text-4xl select-none">{item.product.emoji}</span>
            <div className="flex-1">
              <h4 className="font-medium text-zinc-900">{item.product.name}</h4>
              <p className="text-xs text-zinc-500">{item.product.size}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-rose-500">¥{item.product.price}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="ml-2 text-zinc-300 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-zinc-200 pt-6 space-y-4">
        <div className="flex items-center justify-between text-lg">
          <span className="text-zinc-600">小计</span>
          <span className="font-bold text-zinc-900">¥{total()}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <span>配送费</span>
          <span>免运费</span>
        </div>
        <div className="flex items-center justify-between text-xl font-bold pt-4 border-t border-zinc-100">
          <span className="text-zinc-900">合计</span>
          <span className="text-zinc-900">¥{total()}</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-8 w-full py-4 rounded-xl bg-zinc-900 text-white font-medium text-lg hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? '正在跳转支付...' : `支付 ¥${total()}`}
      </button>

      <Link href="/" className="block text-center mt-4 text-sm text-zinc-400 hover:text-zinc-600 transition-colors">
        继续选购
      </Link>
    </div>
  );
}
