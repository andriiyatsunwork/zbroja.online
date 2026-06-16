// Файл: apps/backend/src/controllers/product.controller.js
import db from '../config/db.js';

export const getProducts = async (req, res) => {
  try {
    const { category, priceMin, priceMax } = req.query;
    
    // Валідація та безпечний парсинг пагінації
    const limit = Math.min(parseInt(req.query.limit) || 20, 100); // Максимум 100 елементів
    const offset = Math.max(parseInt(req.query.offset) || 0, 0);  // Не менше 0

    let query = db('products').select('id', 'name', 'slug', 'image_url', 'min_price');

    if (category) {
      query = query.where('category_id', category);
    }
    if (priceMin) {
      query = query.where('min_price', '>=', parseFloat(priceMin));
    }
    if (priceMax) {
      query = query.where('min_price', '<=', parseFloat(priceMax));
    }

    const products = await query.limit(limit).offset(offset);
    
    res.json({
      data: products,
      pagination: { limit, offset }
    });
  } catch (error) {
    console.error('❌ [getProducts] Error:', error.message);
    res.status(500).json({ error: 'Internal server error while fetching products' });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await db('products').where({ slug }).first();
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Окремо підтягуємо пропозиції (offers) для цього товару
    const offers = await db('offers')
      .where({ product_id: product.id })
      .orderBy('price', 'asc');
      
    res.json({
      data: {
        ...product,
        offers
      }
    });
  } catch (error) {
    console.error(`❌ [getProductBySlug] Error for slug ${req.params.slug}:`, error.message);
    res.status(500).json({ error: 'Internal server error while fetching product details' });
  }
};