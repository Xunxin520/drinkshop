'use client';

import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section id="products" className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-10">
        全部饮品
      </h2>
      {products.length === 0 ? (
        <div className="text-center py-20 text-zinc-400">
          <span className="text-5xl">🥤</span>
          <p className="mt-3">暂无该分类的商品</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
