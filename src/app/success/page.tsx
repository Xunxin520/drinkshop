'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((s) => s.clearCart);
  const total = searchParams.get('total');

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-lg mx-auto px-4 py-32 text-center">
      <span className="text-6xl">🎉</span>
      <h1 className="text-2xl font-bold text-zinc-900 mt-4">订单支付成功！</h1>
      <p className="text-zinc-500 mt-2">
        感谢您的购买
        {total && <span>，共计 ¥{total}</span>}
      </p>
      <p className="text-sm text-zinc-400 mt-1">
        订单确认邮件将发送到您的邮箱
      </p>
      <Link
        href="/"
        className="inline-block mt-8 px-8 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
      >
        继续选购
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-lg mx-auto px-4 py-32 text-center text-zinc-500">
        加载中...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
