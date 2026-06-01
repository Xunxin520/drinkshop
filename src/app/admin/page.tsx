'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer_email: string;
  items: { products: OrderItem[]; shipping?: { name: string; phone: string; address: string; city: string; zip: string; note: string } };
  total: number;
  status: string;
  created_at: string;
  stripe_session_id?: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
      if (!data.user) {
        router.push('/auth/login');
      } else {
        loadOrders();
      }
    });
  }, [router]);

  const loadOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    setOrders(data || []);
    setLoadingOrders(false);
  };

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

  if (!user) return null;

  const paidOrders = orders.filter((o) => o.status === 'paid');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending');

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">管理后台</h1>
          <p className="text-sm text-zinc-500 mt-1">{user.email}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadOrders}
            className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            刷新
          </button>
          <Link
            href="/admin/questionnaires"
            className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            📋 客户需求
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            退出登录
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-white border border-zinc-100 rounded-2xl p-6">
          <p className="text-sm text-zinc-500">总营收</p>
          <p className="text-3xl font-bold text-zinc-900 mt-2">¥{totalRevenue}</p>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-6">
          <p className="text-sm text-zinc-500">总订单</p>
          <p className="text-3xl font-bold text-zinc-900 mt-2">{orders.length}</p>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-6">
          <p className="text-sm text-zinc-500">待处理</p>
          <p className="text-3xl font-bold text-zinc-900 mt-2">{pendingOrders.length}</p>
        </div>
      </div>

      <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="font-semibold text-zinc-900">最近订单</h2>
        </div>
        {loadingOrders ? (
          <div className="px-6 py-10 text-center text-zinc-400">加载中...</div>
        ) : orders.length === 0 ? (
          <div className="px-6 py-10 text-center text-zinc-400">
            <span className="text-4xl">📦</span>
            <p className="mt-2">暂无订单</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-50 text-left text-zinc-500">
                  <th className="px-6 py-3 font-medium">订单号</th>
                  <th className="px-6 py-3 font-medium">收货人</th>
                  <th className="px-6 py-3 font-medium">电话</th>
                  <th className="px-6 py-3 font-medium">地址</th>
                  <th className="px-6 py-3 font-medium">商品</th>
                  <th className="px-6 py-3 font-medium">金额</th>
                  <th className="px-6 py-3 font-medium">状态</th>
                  <th className="px-6 py-3 font-medium">时间</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const shipping = order.items?.shipping;
                  const products = order.items?.products || [];
                  return (
                    <tr key={order.id} className="border-b border-zinc-50 hover:bg-zinc-50/50">
                      <td className="px-6 py-3 font-medium text-zinc-900 text-xs">
                        {order.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-3 text-zinc-600">{shipping?.name || '-'}</td>
                      <td className="px-6 py-3 text-zinc-600">{shipping?.phone || '-'}</td>
                      <td className="px-6 py-3 text-zinc-600 text-xs">
                        <span className="inline-block max-w-[150px] truncate">
                          {shipping ? `${shipping.city || ''} ${shipping.address || ''}` : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-zinc-600 text-xs">
                        {products.map((p) => `${p.name} x${p.quantity}`).join(', ')}
                      </td>
                      <td className="px-6 py-3 font-medium">¥{order.total}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {order.status === 'paid' ? '已支付' : '待支付'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-zinc-500 text-xs">
                        {new Date(order.created_at).toLocaleString('zh-CN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Link href="/" className="inline-block mt-8 text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
        ← 返回商城
      </Link>
    </div>
  );
}
