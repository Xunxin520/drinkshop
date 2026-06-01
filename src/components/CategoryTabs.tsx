'use client';

import { Category } from '@/lib/types';
import { siteConfig } from '@/config/site.config';

interface CategoryTabsProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export default function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 pt-4 pb-2">
      <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-8">
        浏览分类
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {siteConfig.categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key as Category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
              selected === cat.key
                ? 'bg-zinc-900 text-white shadow-md'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
}
