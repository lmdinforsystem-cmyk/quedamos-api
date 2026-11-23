import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js'; 

const app = express();

//1.Convierte el body JSON de las peticiones en req.body
app.use(express.json());

//2. Ruta d eocmprobación
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "ok"});
});

//3. Ruta de autenticación: todo lo de auth.routes.js
app.use('/api/auth', authRoutes);

//4. si ninguna ruta coincide -> 404 en JSON
app.use(notFound);

//5.Manejador de errores: 
app.use(errorHandler);

export default app;