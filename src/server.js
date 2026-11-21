require('dotenv').config({ quiet: true });

const app = require('./app');
const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 3000;
const { MONGO_URI } = process.env;

async function startServer() {
  if (!MONGO_URI) {
    console.error('Falta la variable MONGO_URI en el archivo .env');
    process.exit(1);
  }

  try {
    await connectDB(MONGO_URI);
  } catch (error) {
    console.error('No se pudo conectar a MongoDB:', error.message);
    process.exit(1);
  }

  app.listen(PORT, (error) => {
    if (error) {
      console.error(`No se pudo arrancar el servidor en el puerto ${PORT}:`, error.message);
      process.exit(1);
    }
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

startServer();