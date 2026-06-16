// Файл: apps/backend/knexfile.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пробуємо завантажити .env з поточної папки backend, 
// а якщо немає — з кореню монорепозиторію
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default {
  client: 'pg',
  connection: {
    // Якщо запущено в Docker, DB_HOST буде передано як 'postgres'. 
    // Якщо локально в консолі — візьме '127.0.0.1'
    host: process.env.DB_HOST || '127.0.0.1',
    
    // Внутрішній порт PostgreSQL завжди 5432, але локально ми зазвичай мапимо його на 5433
    port: parseInt(process.env.DB_PORT || '5433', 10),
    
    database: process.env.DB_NAME || 'zbroja_db',
    user: process.env.DB_USER || 'zbroja_user',
    password: process.env.DB_PASSWORD || 'zbroja123',
  },
  pool: {
    min: 2,
    max: 10,
    // Захист від завислих з'єднань під час highload
    createTimeoutMillis: 30000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
  },
  migrations: {
    directory: './src/database/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './seeds',
  }
};