'use client';

import { useState, useMemo } from 'react';
import { Category } from '@/lib/types';
import { siteConfig } from '@/config/site.config';
import Hero from '@/components/Hero';
import CategoryTabs from '@/components/CategoryTabs';
import ProductGrid from '@/components/ProductGrid';
import FeaturedSection from '@/components/FeaturedSection';

export default function Home() {
  const [category, setCategory] = useState<Category>('all');

  const filtered = useMemo(
    () => (category === 'all' ? siteConfig.products : siteConfig.products.filter((p) => p.category === category)),
    [category]
  );

  return (
    <>
      <Hero />
      <CategoryTabs selected={category} onSelect={setCategory} />
      <ProductGrid products={filtered} />
      <FeaturedSection />
    </>
  );
}
