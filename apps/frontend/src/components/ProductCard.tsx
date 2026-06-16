import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="group relative flex flex-col bg-surface border border-border transition-colors duration-120 hover:border-ink">
      
      {/* Бейдж знижки (якщо є) */}
      {product.discountPercentage && (
        <div className="absolute top-0 left-0 z-10 bg-accent text-white px-2 py-1 text-[11px] font-bold uppercase tracking-wider">
          -{product.discountPercentage}%
        </div>
      )}

      {/* Зображення */}
      <Link href={`/product/${product.slug}`} className="block relative w-full aspect-[4/3] bg-bg overflow-hidden border-b border-border p-4">
        <Image
          src={product.imageUrl || '/images/placeholder-tactical.jpg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
          loading="lazy"
        />
      </Link>

      {/* Контент */}
      <div className="flex flex-col flex-grow p-4">
        <Link href={`/product/${product.slug}`} className="block mb-3">
          <h3 className="font-sans font-semibold text-[14px] text-ink line-clamp-2 leading-snug hover:underline">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="flex flex-col mb-4">
            <span className="font-sans font-extrabold text-[22px] text-accent">
              {product.minPrice.toLocaleString('uk-UA')} ₴
            </span>
            <span className="font-sans font-normal text-[12px] text-ink-muted mt-1">
              Від {product.offersCount} магазинів
            </span>
          </div>
          
          <Link 
            href={`/product/${product.slug}`}
            className="block w-full text-center bg-darkbar text-white font-bold uppercase text-sm py-3 transition-colors duration-120 group-hover:bg-accent"
          >
            Дивитись ціни
          </Link>
        </div>
      </div>
    </article>
  );
};