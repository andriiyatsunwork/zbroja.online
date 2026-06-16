import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null
});

// Створюємо чергу
export const scrapeQueue = new Queue('scrape-tasks', { connection });

// Функція для додавання завдання
export const addScrapeTask = async (storeId, productUrl) => {
  await scrapeQueue.add('scrape-product', { storeId, productUrl }, {
    attempts: 3, // якщо помилка, спробувати ще 3 рази
    backoff: { type: 'exponential', delay: 5000 } // чекати перед повтором
  });
  console.log(`Task added: ${productUrl}`);
};
