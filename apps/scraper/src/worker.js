import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import { scrapeIbisProduct } from './scrapers/ibis.scraper.js'; // Підключаємо наш парсер



const db = knex(knexConfig);
const connection = new IORedis({ 
  host: 'localhost', 
  port: 6379,
  maxRetriesPerRequest: null // ЦЕ ОБОВ'ЯЗКОВО ДЛЯ BULLMQ
});

const worker = new Worker('scrape-tasks', async (job) => {
  const { productUrl } = job.data;
  
  // Викликаємо функцію парсингу для Ibis
  const { name, price } = await scrapeIbisProduct(productUrl);
  
  // Зберігаємо в базу
  await db('products')
    .insert({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      min_price: price,
      category_id: 1
    })
    .onConflict('slug')
    .merge();

  console.log(`✅ Збережено: ${name} - ${price} грн`);
  
}, { connection });