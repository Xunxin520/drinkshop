'use client';

import { products } from '@/data/products';
import { useCartStore } from '@/lib/store';

export default function FeaturedSection() {
  const addItem = useCartStore((s) => s.addItem);
  const featured = products.filter((p) => p.featured);

  return (
    <section id="about" className="bg-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-10">
          本月推荐
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-zinc-100"
            >
              <div className="text-6xl mb-4 select-none">{product.emoji}</div>
              <h3 className="font-semibold text-zinc-900 text-lg">{product.name}</h3>
              <p className="text-sm text-zinc-500 mt-2 line-clamp-2">{product.description}</p>
              <div className="mt-4">
                <span className="text-xl font-bold text-rose-500">¥{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through ml-2">¥{product.originalPrice}</span>
                )}
              </div>
              <button
                onClick={() => addItem(product)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-white font-medium text-sm hover:bg-amber-600 transition-colors cursor-pointer"
              >
                加入购物车
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
