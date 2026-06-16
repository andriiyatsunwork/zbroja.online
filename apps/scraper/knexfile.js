import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export default {
  client: 'pg',
  connection: process.env.DATABASE_URL, // Або ваші параметри підключення
  migrations: {
    directory: '../backend/migrations' // Вказуємо шлях до папки міграцій бекенду
  }
};