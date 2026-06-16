export interface Offer {
  id: number;
  storeId: number;
  storeName: string;
  price: number;
  buyUrl: string;
  inStock: boolean;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  imageUrl: string | null;
  minPrice: number;
  offersCount: number;
  discountPercentage?: number; // Опціонально для бейджа
}