//1.CARGAR VARIABLES DEL ARCHIVO .env en process.env
require('dotenv').config({ quiet: true });

//2 IMPORTAR LA APLICACIÓN EXPRESS (configurada en app.js)
const app = require('./app');
const connectDB = require('./config/db.js'); //importamos la fn que conecta con MongoDB

//3. LEER LA CONFIG. DEL .env
const PORT = process.env.PORT || 3000;
const { MONGO_URI } = process.env;

//4. FUNCIÓN QUE ARRANCA EN ORDEN CORRECTO
async function startServer() {
  if (!MONGO_URI) {
    console.error('Falta la variable MONGO_URI en el archivo .env');
    process.exit(1); // EL PROGRAMA TERMINA POR UN ERROR
  }

  //5.CONECTAMOS MongoDB ANTES DE ARRANCAR EL SERVIDOR
  //si la conexión falla no tiene sentido  aceptar peticiones
  try {
    await connectDB(MONGO_URI);
  } catch (error) {
    console.error('No se pudo conectar a MongoDB:', error.message);
    process.exit(1);
  }

  //6. CON LA DB CONECTADA, EL SERVIDOR ESCUCHA
  //si el puerto está ocupado, el error llega aquí.
  app.listen(PORT, (error) => {
    if (error) {
      console.error(`No se pudo arrancar el servidor en el puerto ${PORT}:`, error.message);
      process.exit(1);
    }
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

//7. EJECUTAMOS LA FUNCIÓN DE ARRANQUE
startServer();