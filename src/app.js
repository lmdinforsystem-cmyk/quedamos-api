import express from 'express';
import router from './routes/router.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

const app = express();

// 1. Convierte el body JSON de las peticiones en req.body
app.use(express.json());

// 2. Todas las rutas de la API cuelgan de /api
app.use('/api', router);

// 3. Si ninguna ruta coincide → 404 en JSON
app.use(notFound);

// 4. Manejador de errores: siempre el último
app.use(errorHandler);

export default app;