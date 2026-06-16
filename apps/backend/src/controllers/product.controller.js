import db from '../config/db.js';

export const getProducts = async (req, res) => {
  try {
    const { category, priceMin, priceMax, limit = 20, offset = 0 } = req.query;

    let query = db('products').select('*');

    if (category) {
      query = query.where('category_id', category);
    }
    
    if (priceMin) query = query.where('min_price', '>=', priceMin);
    if (priceMax) query = query.where('min_price', '<=', priceMax);

    const products = await query.limit(limit).offset(offset);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await db('products').where({ slug }).first();
    
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};