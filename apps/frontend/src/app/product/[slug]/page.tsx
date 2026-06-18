// apps/frontend/src/app/product/[slug]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, ShieldCheck, CheckCircle2, XCircle, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// ==========================================
// 1. MOCK DATA (Тимчасові дані)
// ==========================================
const MOCK_DATA = {
  productDetails: {
    'sts-223-rem': {
      id: 1, 
      name: 'Набій нарізний STS калібр .223 Rem, куля FMJ, 55 gr', 
      slug: 'sts-223-rem', 
      image_url: 'https://via.placeholder.com/800x600/EBEBEB/8A8A8A?text=STS+223+Rem', 
      min_price: 35.50,
      description: "Нарізний патрон калібру .223 Remington з кулею FMJ (Full Metal Jacket) вагою 55 гран від українського виробника STS. Ідеальний вибір для тренувань та практичної стрільби. Забезпечує стабільну балістику та надійну роботу автоматики зброї.",
      attributes: { "Калібр": ".223 Rem", "Тип кулі": "FMJ", "Вага кулі": "55 gr / 3.56 g", "Початкова швидкість": "990 м/с", "Виробник": "STS", "Країна виробник": "Україна" },
      offers: [
        { id: 101, store_name: 'Ibis', price: 35.50, availability: true, link: '#' },
        { id: 102, store_name: 'Stvol', price: 37.00, availability: true, link: '#' },
        { id: 103, store_name: 'Safary', price: 34.00, availability: false, link: '#' },
      ]
    }
  }
};

// ==========================================
// 2. ГОЛОВНИЙ КОМПОНЕНТ (PDP)
// ==========================================
export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Імітація запиту до API
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const data = MOCK_DATA.productDetails[params.slug as keyof typeof MOCK_DATA.productDetails] || {
        id: 999,
        name: `Детальна інформація: ${params.slug.replace(/-/g, ' ')}`,
        slug: params.slug,
        image_url: 'https://via.placeholder.com/800x600/EBEBEB/8A8A8A?text=Product',
        min_price: 1500,
        description: "SEO-оптимізований опис товару, який допомагає пошуковим системам краще зрозуміти контент сторінки.",
        attributes: { "Статус": "Тестовий", "Країна": "Україна" },
        offers: [
          { id: 1, store_name: 'Магазин 1', price: 1500, availability: true, link: '#' },
          { id: 2, store_name: 'Магазин 2', price: 1450, availability: false, link: '#' },
        ]
      };
      setProduct(data);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [params.slug]);

  // Стан завантаження (Skeleton)
  if (loading) return (
    <div className="mx-auto max-w-[1280px] p-8">
       <div className="h-[60vh] w-full animate-pulse rounded-md bg-elevated"></div>
    </div>
  );

  // Якщо товар не знайдено
  if (!product) return <div className="p-16 text-center font-medium text-text-muted">Товар не знайдено</div>;

  // ----------------------------------------
  // 3. SEO ОПТИМІЗАЦІЯ (JSON-LD Microdata)
  // ----------------------------------------
  const maxPrice = Math.max(...product.offers.map((o: any) => o.price));
  const inStock = product.offers.some((o: any) => o.availability);
  
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image_url,
    "description": product.description,
    "sku": product.slug,
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://zbroja.online/product/${product.slug}`,
      "priceCurrency": "UAH",
      "lowPrice": product.min_price,
      "highPrice": maxPrice,
      "offerCount": product.offers.length,
      "availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <article className="mx-auto max-w-[1280px] px-4 pb-16 md:px-8">
      {/* Ін'єкція мікророзмітки в <head> сторінки */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs (Навігаційний ланцюжок) */}
      <nav aria-label="Breadcrumb" className="my-6">
        <ol className="flex items-center gap-2 text-sm text-text-secondary">
          <li><Link href="/" className="hover:text-text-primary transition-colors">Головна</Link></li>
          <li><ChevronRight size={14} className="text-border" /></li>
          <li><span className="text-text-muted">Каталог</span></li>
          <li><ChevronRight size={14} className="text-border" /></li>
          <li aria-current="page" className="max-w-[150px] truncate font-medium text-text-primary sm:max-w-[300px]">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Основний блок товару */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Ліва колонка: Зображення */}
        <div className="lg:col-span-5">
          <div className="flex aspect-[4/3] items-center justify-center rounded-md border border-border bg-base p-4">
            <img src={product.image_url} alt={`Придбати ${product.name}`} className="max-h-full max-w-full object-contain mix-blend-multiply" />
          </div>
        </div>

        {/* Права колонка: Інформація */}
        <div className="flex flex-col lg:col-span-7">
          <h1 className="mb-4 text-2xl font-extrabold leading-tight text-text-primary sm:text-3xl">
            {product.name}
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="text-sm text-text-muted">Код: {product.id}</span>
            {inStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success-subtle px-2.5 py-1 text-xs font-semibold text-success">
                <CheckCircle2 size={14} /> В наявності ({product.offers.filter((o: any) => o.availability).length})
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-text-muted">
                <XCircle size={14} /> Очікується
              </span>
            )}
          </div>

          {/* Блок ціни */}
          <div className="mb-8 flex items-center justify-between rounded-md border border-border bg-base p-6 shadow-card">
            <div>
              <p className="mb-1 text-sm font-medium text-text-secondary">Найкраща ціна від:</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-text-primary sm:text-4xl">
                  {product.min_price.toLocaleString('uk-UA')}
                </span>
                <span className="text-xl font-bold text-accent">₴</span>
              </div>
            </div>
            <ShieldCheck className="h-10 w-10 text-elevated sm:h-12 sm:w-12" />
          </div>

          {/* Короткі характеристики */}
          <div className="flex-1">
            <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold text-text-primary">
              Основні характеристики
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(product.attributes).slice(0, 5).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-border/50 pb-1 text-sm last:border-0">
                  <span className="text-text-secondary">{key}</span>
                  <span className="text-right font-medium text-text-primary">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Опис товару */}
      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold text-text-primary">Опис товару</h2>
        <p className="max-w-[800px] text-base leading-relaxed text-text-secondary">
          {product.description}
        </p>
      </section>

      {/* Таблиця пропозицій магазинів */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-text-primary">
          Пропозиції магазинів ({product.offers.length})
        </h2>
        
        <div className="overflow-x-auto rounded-md border border-border bg-base shadow-card">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr>
                <th className="border-b border-border bg-surface px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Магазин</th>
                <th className="border-b border-border bg-surface px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Наявність</th>
                <th className="border-b border-border bg-surface px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-text-secondary">Ціна</th>
                <th className="border-b border-border bg-surface px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-text-secondary">Дія</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {product.offers.map((offer: any) => (
                <tr key={offer.id} className="transition-colors hover:bg-surface">
                  <td className="px-5 py-4 font-semibold text-text-primary">
                    {offer.store_name}
                  </td>
                  <td className="px-5 py-4">
                    {offer.availability ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success-subtle px-2.5 py-1 text-xs font-semibold text-success">
                        <CheckCircle2 size={14} /> Є в наявності
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-text-muted">
                        <XCircle size={14} /> Очікується
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right text-lg font-bold text-text-primary">
                    {offer.price.toLocaleString('uk-UA')} <span className="text-sm text-accent">₴</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <a 
                      href={offer.link} 
                      target="_blank" 
                      rel="noreferrer nofollow" 
                      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-5 py-2.5 text-sm font-bold transition-colors ${offer.availability ? 'bg-accent text-white hover:bg-accent-hover' : 'cursor-not-allowed bg-elevated text-text-muted'}`}
                      onClick={(e) => !offer.availability && e.preventDefault()}
                    >
                      <ShoppingCart size={16} /> Перейти
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}