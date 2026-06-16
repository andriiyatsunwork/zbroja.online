import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeIbisProduct(url) {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  const $ = cheerio.load(response.data);

  // 1. Отримуємо назву
  const name = $('#variant-title').text().trim(); 

  // 2. Отримуємо ціну
  // Ми шукаємо всі елементи з класом .text-primary, 
  // фільтруємо їх, щоб знайти той, який містить "грн",
  // і беремо текст першого знайденого елемента.
  const rawPriceText = $('.text-primary')
    .filter((i, el) => $(el).text().includes('грн'))
    .first()
    .text();

  console.log('DEBUG: Знайдений текст ціни:', rawPriceText);

  // 3. Очищуємо текст:
  // - прибираємо слово "грн"
  // - замінюємо кому на крапку (для JS-числа)
  // - прибираємо зайві пробіли
  const cleanPrice = rawPriceText
    .replace('грн', '')
    .replace(',', '.')
    .replace(/\s/g, '') // видаляє всі невидимі пробіли (як &nbsp;)
    .trim();

  const price = parseFloat(cleanPrice);

  return { name, price };
}