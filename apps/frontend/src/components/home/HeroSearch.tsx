"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const [license, setLicense] = useState<'Все' | 'Є!' | 'Нема!'>('Все');
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    const licenseMap = { 'Все': 'all', 'Є!': 'required', 'Нема!': 'none' };
    router.push(`/search?q=${encodeURIComponent(query)}&license=${licenseMap[license]}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="px-4 py-10 text-center sm:py-16">
      <h1 className="mb-8 text-3xl font-black uppercase tracking-tight sm:text-4xl">
        Обороняйся вигідно!
      </h1>
      
      <div className="mx-auto max-w-xl">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Товар, магазин, виробник..."
            className="w-full border border-black bg-white py-3 pl-10 pr-4 font-medium placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <span className="text-sm font-bold uppercase tracking-wide">Дозвіл:</span>
          <div className="flex gap-2">
            {(['Все', 'Є!', 'Нема!'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setLicense(opt)}
                className={`border border-black px-5 py-1.5 text-sm transition-all duration-150 ${
                  license === opt 
                    ? 'bg-yellow-400 font-bold' 
                    : 'bg-white font-medium hover:-translate-y-0.5 hover:bg-yellow-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}