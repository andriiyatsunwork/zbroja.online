import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import productRoutes from './routes/product.routes.js';

// Налаштування для коректної роботи зі шляхами (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. ВАЖЛИВО: Роздача статичних файлів (вашого фронтенду)
// Ми вказуємо шлях до папки frontend, яка лежить на рівень вище
app.use(express.static(path.join(__dirname, '../../frontend')));

// 3. Маршрути API
app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'success', message: 'API is online' });
});

// 4. Функція запуску з перевіркою бази даних
const startServer = async () => {
    try {
        // Перевірка з'єднання
        await db.raw('SELECT 1');
        console.log('✅ [Database] Connected successfully');

        // Запуск сервера тільки після успішної перевірки БД
        app.listen(PORT, () => {
            console.log(`🚀 [Backend] Server is listening on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ [Database] Connection failed:', err.message);
        process.exit(1); 
    }
};

// Запуск
startServer();