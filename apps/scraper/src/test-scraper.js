import { addScrapeTask } from './queue.js';

async function runTest() {
  console.log('--- Запускаю тест парсингу для Ibis ---');
  
  // Вставте сюди посилання на товар
  await addScrapeTask(1, 'https://ibis.net.ua/zbroia/details/patron-sellier-bellot-kal-9x18-kulia-fmj-masa-6-1-g-95-gr/');
  
  console.log('--- Завдання додано в чергу ---');
  
  setTimeout(() => process.exit(0), 5000);
}

runTest();