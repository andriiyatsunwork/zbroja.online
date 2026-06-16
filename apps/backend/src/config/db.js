import knex from 'knex';
import knexConfig from '../../knexfile.js';

// Ініціалізуємо підключення
const db = knex(knexConfig);

// Перевіряємо, чи є зв'язок
db.raw('SELECT 1')
  .then(() => console.log('✅ Connected to PostgreSQL successfully!'))
  .catch((err) => console.error('❌ PostgreSQL connection error:', err));

export default db;