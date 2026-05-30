'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DemoOrder {
  id: string;
  customer: string;
  total: number;
  items: number;
  status: string;
  time: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders] = useState<DemoOrder[]>([
    { id: 'ORD-001', customer: 'user@example.com', total: 52, items: 2, status: '已支付', time: '2026-05-27 10:30' },
    { id: 'ORD-002', customer: 'vip@example.com', total: 128, items: 5, status: '已支付', time: '2026-05-27 11:15' },
    { id: 'ORD-003', customer: 'new@example.com', total: 36, items: 1, status: '待支付', time: '2026-05-27 12:00' },
  ]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
      if (!data.user) {
        router.push('/auth/login');
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <p className="text-zinc-500">加载中...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalRevenue = orders
    .filter((o) => o.status === '已支付')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === '待支付').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">管理后台</h1>
          <p className="text-sm text-zinc-500 mt-1">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
        >
          退出登录
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-white border border-zinc-100 rounded-2xl p-6">
          <p className="text-sm text-zinc-500">总营收</p>
          <p className="text-3xl font-bold text-zinc-900 mt-2">¥{totalRevenue}</p>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-6">
          <p className="text-sm text-zinc-500">总订单</p>
          <p className="text-3xl font-bold text-zinc-900 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-6">
          <p className="text-sm text-zinc-500">待处理</p>
          <p className="text-3xl font-bold text-zinc-900 mt-2">{pendingOrders}</p>
        </div>
      </div>

      <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="font-semibold text-zinc-900">最近订单</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-50 text-left text-zinc-500">
                <th className="px-6 py-3 font-medium">订单号</th>
                <th className="px-6 py-3 font-medium">客户</th>
                <th className="px-6 py-3 font-medium">金额</th>
                <th className="px-6 py-3 font-medium">商品数</th>
                <th className="px-6 py-3 font-medium">状态</th>
                <th className="px-6 py-3 font-medium">时间</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-zinc-50 hover:bg-zinc-50/50">
                  <td className="px-6 py-3 font-medium text-zinc-900">{order.id}</td>
                  <td className="px-6 py-3 text-zinc-600">{order.customer}</td>
                  <td className="px-6 py-3 font-medium">¥{order.total}</td>
                  <td className="px-6 py-3">{order.items}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === '已支付'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-zinc-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Link href="/" className="inline-block mt-8 text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
        ← 返回商城
      </Link>
    </div>
  );
}
