export interface Category {
  id: number;
  name: string;
  slug: string;
  iconUrl?: string | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string; // Для SEO-посилань, наприклад: /product/glock-17
  categoryId: number;
  categoryName?: string; // Для зручного відображення на карточці
  price: number;
  imageUrl: string | null;
  inStock: boolean; // Статус наявності
  attributes?: Record<string, string>; // Динамічні характеристики (JSONB у базі), наприклад: { "Калібр": "9х19", "Бренд": "Glock" }
}