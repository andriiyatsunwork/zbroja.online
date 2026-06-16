// apps/backend/src/index.js
import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import productRoutes from './routes/product.routes.js';

const app = express();
// Змінюємо порт на 3001, щоб уникнути конфлікту з Next.js (який за замовчуванням займає 3000)
const PORT = process.env.PORT || 3001;

// 1. Middleware
app.use(cors());
app.use(express.json());

// ВИДАЛЕНО: express.static(path.join(__dirname, '../../frontend'))
// Бекенд більше не відповідає за роздачу UI

// 2. Маршрути API
app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'success', message: 'API is online' });
});

// 3. Запуск сервера з перевіркою БД
const startServer = async () => {
    try {
        await db.raw('SELECT 1');
        console.log('✅ [Database] Connected successfully');

        app.listen(PORT, () => {
            console.log(`🚀 [Backend] Server is listening on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ [Database] Connection failed:', err.message);
        process.exit(1); 
    }
};

startServer();