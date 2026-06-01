'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Questionnaire {
  id: string;
  client_name: string;
  wechat: string;
  email: string | null;
  industry: string;
  industry_other: string | null;
  product_count: string | null;
  styles: string[];
  colors: string[];
  reference_urls: string | null;
  assets: string | null;
  features: string[];
  need_lang: string;
  payments: string[];
  market: string;
  budget: string | null;
  timeline: string | null;
  notes: string | null;
  created_at: string;
}

const INDUSTRY_LABELS: Record<string, string> = {
  drink: '🥤 饮品零食',
  clothes: '👗 服装服饰',
  food: '🍱 餐饮美食',
  digital: '📱 数码电子',
  beauty: '💄 美妆护肤',
  other: '📦 其他',
};

export default function QuestionnairesPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selected, setSelected] = useState<Questionnaire | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
      if (!data.user) {
        router.push('/auth/login');
      } else {
        loadQuestionnaires();
      }
    });
  }, [router]);

  const loadQuestionnaires = async () => {
    const { data } = await supabase
      .from('questionnaires')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    setQuestionnaires(data || []);
    setLoadingData(false);
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">📋 客户需求列表</h1>
          <p className="text-sm text-zinc-500 mt-1">{questionnaires.length} 份需求表</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadQuestionnaires}
            className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            刷新
          </button>
          <Link
            href="/admin"
            className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            订单管理
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            退出登录
          </button>
        </div>
      </div>

      {loadingData ? (
        <div className="text-center py-10 text-zinc-400">加载中...</div>
      ) : questionnaires.length === 0 ? (
        <div className="bg-white border border-zinc-100 rounded-2xl py-16 text-center text-zinc-400">
          <span className="text-5xl">📭</span>
          <p className="mt-3">暂无客户需求</p>
          <p className="text-sm mt-1">客户填写需求表后会出现在这里</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* List */}
          <div className="lg:col-span-1 space-y-3">
            {questionnaires.map((q) => (
              <button
                key={q.id}
                onClick={() => setSelected(q)}
                className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                  selected?.id === q.id
                    ? 'border-indigo-300 bg-indigo-50'
                    : 'border-zinc-100 bg-white hover:border-zinc-200'
                }`}
              >
                <div className="font-semibold text-zinc-900 text-sm">{q.client_name}</div>
                <div className="text-xs text-zinc-500 mt-1">
                  {INDUSTRY_LABELS[q.industry] || q.industry}
                  {q.industry_other ? ` · ${q.industry_other}` : ''}
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  {new Date(q.created_at).toLocaleDateString('zh-CN')}
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white border border-zinc-100 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900">{selected.client_name}</h2>
                    <p className="text-sm text-zinc-500">
                      {new Date(selected.created_at).toLocaleString('zh-CN')}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                    {INDUSTRY_LABELS[selected.industry] || selected.industry}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">联系方式</h3>
                    <p className="text-sm text-zinc-900">📱 {selected.wechat}</p>
                    {selected.email && <p className="text-sm text-zinc-600">📧 {selected.email}</p>}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">预算 & 时间</h3>
                    <p className="text-sm text-zinc-900">💰 {selected.budget || '未选'}</p>
                    <p className="text-sm text-zinc-600">⏰ {selected.timeline || '未选'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">品类 & 商品量</h3>
                    <p className="text-sm text-zinc-900">{INDUSTRY_LABELS[selected.industry] || selected.industry}{selected.industry_other ? ` — ${selected.industry_other}` : ''}</p>
                    <p className="text-sm text-zinc-600">📦 {selected.product_count || '未选'}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">市场 & 语言</h3>
                    <p className="text-sm text-zinc-900">🌍 {selected.market === 'china' ? '国内' : selected.market === 'global' ? '海外' : '两个都要'}</p>
                    <p className="text-sm text-zinc-600">🗣️ {selected.need_lang === 'en' ? '中+英' : selected.need_lang === 'multi' ? '多语言' : '只要中文'}</p>
                  </div>
                </div>

                {selected.styles.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">风格偏好</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.styles.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-zinc-100 rounded-md text-xs text-zinc-700">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.colors.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">色调偏好</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.colors.map(c => (
                        <span key={c} className="px-2 py-0.5 bg-zinc-100 rounded-md text-xs text-zinc-700">{c}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.features.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">额外功能需求</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.features.map(f => (
                        <span key={f} className="px-2 py-0.5 bg-green-50 rounded-md text-xs text-green-700">{f}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.payments.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">支付方式</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.payments.map(p => (
                        <span key={p} className="px-2 py-0.5 bg-blue-50 rounded-md text-xs text-blue-700">{p}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.reference_urls && (
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">参考网站</h3>
                    <p className="text-sm text-zinc-700 whitespace-pre-wrap">{selected.reference_urls}</p>
                  </div>
                )}

                {selected.assets && (
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">Logo / 图片</h3>
                    <p className="text-sm text-zinc-700 whitespace-pre-wrap">{selected.assets}</p>
                  </div>
                )}

                {selected.notes && (
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-1">额外备注</h3>
                    <p className="text-sm text-zinc-700 whitespace-pre-wrap bg-amber-50 rounded-lg p-3">{selected.notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-zinc-100 rounded-2xl py-16 text-center text-zinc-400">
                <span className="text-4xl">👈</span>
                <p className="mt-2">点击左侧客户查看详情</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Link href="/" className="inline-block mt-8 text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
        ← 返回商城
      </Link>
    </div>
  );
}
