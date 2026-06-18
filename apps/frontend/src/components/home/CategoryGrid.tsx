import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export const CATEGORIES = [
  'Набої', 'Пістолети', 'Гвинтівки', 'Приціли', 'Пневмати', 'Ножі',
  'Холодна зброя', 'Тюнінг', 'Релоадінг', 'Оптика', 'Чистка/Догляд', 'Сейфи'
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto mb-16 max-w-[1200px] px-4">
      <div className="grid grid-cols-1 border-l border-t border-black sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat} 
            className="group flex cursor-pointer items-center gap-3 border-b border-r border-black bg-white px-4 py-3 transition-all duration-150 hover:bg-yellow-400"
          >
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-black bg-gray-100 transition-colors group-hover:bg-white">
              <ImageIcon size={14} className="text-gray-400 group-hover:text-black" />
            </div>
            <span className="text-sm font-bold">{cat}</span>
          </div>
        ))}
      </div>
    </section>
  );
}