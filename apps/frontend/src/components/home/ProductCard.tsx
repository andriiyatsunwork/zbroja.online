import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Product } from '@/types'; // Беремо тип з нашого нового файлу

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex cursor-pointer flex-col border border-black bg-white p-3 transition-all duration-150 hover:-translate-y-1 hover:border-yellow-400">
      {/* Заглушка для фото */}
      <div className="mb-3 flex aspect-square w-full items-center justify-center border border-black bg-gray-100">
        <ImageIcon className="text-gray-300" size={48} strokeWidth={1} />
      </div>
      
      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-bold leading-tight text-black">
          {product.name}
        </h3>
        <p className="mt-1 text-xs font-medium text-gray-500">
          {product.categoryName}
        </p>
        <div className="mt-auto pt-3">
          <p className="text-[11px] font-bold uppercase text-gray-400">Ціни від</p>
          <p className="text-lg font-black text-yellow-600">
            {product.price.toLocaleString('uk-UA')} ₴
          </p>
        </div>
      </div>
    </div>
  );
}