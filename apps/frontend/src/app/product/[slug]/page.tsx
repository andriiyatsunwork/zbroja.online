import { Metadata } from 'next';
import { getProductBySlug } from '@/lib/api';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  
  return {
    title: `${product.name} — ціни від ${product.minPrice} грн | ZBROJA.ONLINE`,
    description: `${product.name}: порівняй ціни в ${product.offersCount} магазинах. Найнижча ціна — ${product.minPrice} грн. Купи вигідно.`,
    alternates: {
      canonical: `https://zbroja.online/product/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      images: [product.imageUrl || '/default-og.jpg'],
    }
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Тут буде рендер сторінки товару з PriceTable та JSON-LD
  return (
    <main>
      {/* ... */}
    </main>
  );
}