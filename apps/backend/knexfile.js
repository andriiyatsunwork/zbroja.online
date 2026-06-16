import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export default {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5433,           // ЗМІНЕНО: новий порт
    database: 'zbroja_db',
    user: 'zbroja_admin',
    password: 'zbroja123',// Жорстко вказаний пароль
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './src/database/migrations',
    tableName: 'knex_migrations'
  }
};