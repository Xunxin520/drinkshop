'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';

interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  note: string;
}

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState<ShippingInfo>({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    note: '',
  });

  const handleCheckout = async () => {
    if (!shipping.name || !shipping.phone || !shipping.address) {
      alert('请填写收货人、电话和地址');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shipping }),
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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-zinc-900 mb-8">确认订单</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 收货信息 */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">收货信息</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">收货人 *</label>
              <input
                type="text"
                value={shipping.name}
                onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-300 text-sm"
                placeholder="姓名"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">电话 *</label>
              <input
                type="tel"
                value={shipping.phone}
                onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-300 text-sm"
                placeholder="手机号码"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">收货地址 *</label>
              <input
                type="text"
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-300 text-sm"
                placeholder="详细地址"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">城市</label>
                <input
                  type="text"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-300 text-sm"
                  placeholder="城市"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">邮编</label>
                <input
                  type="text"
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-300 text-sm"
                  placeholder="邮编"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">备注</label>
              <textarea
                value={shipping.note}
                onChange={(e) => setShipping({ ...shipping, note: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-300 text-sm"
                placeholder="订单备注（可选）"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* 订单明细 */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">订单明细</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 py-3 border-b border-zinc-100">
                <span className="text-3xl select-none">{item.product.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-zinc-900 text-sm">{item.product.name}</h4>
                  <p className="text-xs text-zinc-500">{item.product.size}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-rose-500 text-sm">¥{item.product.price}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-medium w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer text-xs"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-1 text-zinc-300 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-zinc-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">小计</span>
              <span className="font-medium text-zinc-900">¥{total()}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <span>配送费</span>
              <span>免运费</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-zinc-100">
              <span className="text-zinc-900">合计</span>
              <span className="text-zinc-900">¥{total()}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full py-3.5 rounded-xl bg-zinc-900 text-white font-medium text-base hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? '正在跳转支付...' : `支付 ¥${total()}`}
          </button>
        </div>
      </div>

      <Link href="/" className="inline-block mt-8 text-sm text-zinc-400 hover:text-zinc-600 transition-colors">
        ← 继续选购
      </Link>
    </div>
  );
}
