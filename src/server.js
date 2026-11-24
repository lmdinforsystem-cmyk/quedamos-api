// Lo primero: carga y valida el .env (si falta algo, la aplicación no arranca)
import { env } from './config/env.js';

import app from './app.js';
import connectDB from './config/db.js';

// Arranca todo en orden: primero MongoDB, después el servidor
async function startServer() {
  try {
    await connectDB(env.MONGO_URI);
  } catch (error) {
    console.error('No se pudo conectar a MongoDB:', error.message);
    process.exit(1);
  }

  app.listen(env.PORT, (error) => {
    if (error) {
      console.error(`No se pudo arrancar el servidor en el puerto ${env.PORT}:`, error.message);
      process.exit(1);
    }
    console.log(`Servidor escuchando en http://localhost:${env.PORT}`);
  });
}

startServer();