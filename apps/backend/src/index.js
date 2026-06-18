// apps/backend/src/index.js
import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import productRoutes from './routes/product.routes.js';

const app = express();
// Порт 3001 — для уникнення конфлікту з Next.js (який за замовчуванням на 3000)
const PORT = process.env.PORT || 3001;

// 1. Middleware
// Налаштування CORS: дозволяємо запити з порту 3000, де працює фронтенд
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// 2. Маршрути API
app.use('/api/products', productRoutes);

// Ендпоінт для моніторингу статусу
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'success', 
        message: 'API is online',
        timestamp: new Date().toISOString()
    });
});

// 3. Запуск сервера з попередньою перевіркою бази даних
const startServer = async () => {
    try {
        // Перевірка, чи база даних "відгукується"
        await db.raw('SELECT 1');
        console.log('✅ [Database] Connection established');

        app.listen(PORT, () => {
            console.log(`🚀 [Backend] Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ [Database] Connection failed:', err.message);
        // Завершуємо процес з помилкою, якщо БД недоступна — це важливо для стабільності
        process.exit(1); 
    }
};

startServer();