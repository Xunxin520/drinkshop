'use client';

import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const inCart = cartItems.find((i) => i.product.id === product.id);

  return (
    <div className="group bg-white rounded-2xl border border-zinc-100 p-5 hover:shadow-lg hover:border-zinc-200 transition-all duration-300 flex flex-col">
      <div className="text-6xl text-center py-6 select-none relative">
        {product.emoji}
        {product.tags.length > 0 && (
          <div className="absolute top-0 left-0 flex gap-1">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <h3 className="font-semibold text-zinc-900 mt-2">{product.name}</h3>
      <p className="text-sm text-zinc-500 mt-1 line-clamp-2 flex-1">{product.description}</p>

      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="text-lg font-bold text-rose-500">¥{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-zinc-400 line-through ml-2">¥{product.originalPrice}</span>
          )}
        </div>
        <span className="text-xs text-zinc-400">{product.size}</span>
      </div>

      <button
        onClick={() => addItem(product)}
        className="mt-3 w-full py-2.5 rounded-xl font-medium text-sm cursor-pointer transition-all active:scale-95
          bg-zinc-900 text-white hover:bg-zinc-800"
      >
        {inCart ? `加入购物车 (${inCart.quantity})` : '加入购物车'}
      </button>
    </div>
  );
}
