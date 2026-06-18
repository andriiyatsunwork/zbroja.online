import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { CATEGORIES } from './CategoryGrid';

// Генеруємо мокові дані, що відповідають нашому новому інтерфейсу Product
const mockProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Професійне спорядження ${i + 1}`,
  slug: `product-${i + 1}`,
  categoryId: (i % CATEGORIES.length) + 1,
  categoryName: CATEGORIES[i % CATEGORIES.length],
  price: (i + 1) * 480 + 320,
  imageUrl: null,
  inStock: true,
}));

export default function ProductGrid() {
  return (
    <section className="mx-auto mb-16 max-w-[1200px] px-4">
      <h2 className="mb-6 border-b border-black pb-2 text-xl font-black uppercase tracking-tight">
        Популярні товари
      </h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {mockProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}