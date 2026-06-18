import React from 'react';
// Імпортуємо компоненти. Переконайся, що шляхи (@/components/...) 
// налаштовані у твоєму tsconfig.json.
// Якщо ні, використовуй відносні шляхи, наприклад: '../components/home/HeroSearch'
import HeroSearch from '@/components/home/HeroSearch';
import CategoryGrid from '@/components/home/CategoryGrid';
import ProductGrid from '@/components/home/ProductGrid';
import AboutSection from '@/components/home/AboutSection';
import Disclaimer from '@/components/home/Disclaimer';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-black selection:bg-yellow-400 selection:text-black">
      {/* Header тут немає, бо він знаходиться в app/layout.tsx 
        і автоматично застосовується до всіх сторінок.
      */}
      
      {/* Секція пошуку (Клієнтський компонент) */}
      <HeroSearch />
      
      {/* Сітка категорій (Серверний компонент) */}
      <CategoryGrid />
      
      {/* Сітка популярних товарів (Серверний компонент) */}
      <ProductGrid />
      
      {/* Секція "Про сервіс" (Серверний компонент) */}
      <AboutSection />
      
      {/* Дисклеймер (Серверний компонент) */}
      <Disclaimer />
      
      {/* Футер (Серверний компонент) */}
      <Footer />
    </main>
  );
}