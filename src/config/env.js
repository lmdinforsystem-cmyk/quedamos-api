
import dotenv from 'dotenv';
// Carga las variables del .env en process.env
dotenv.config({ quiet: true });

//variables sin las cuales la app no puede funcionar
const REQUIRED = ['MONGO_URI', 'JWT_SECRET'];

//lee variables, comprueba las obligatorias y las devuelve
function getEnv() {
    const missing = REQUIRED.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(
            `Faltan variables de entorno: ${missing.join(', ')}. Revisqa tu .env (mira .env.example)`
        );
    }

    return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',

    };
} 

//se ejecuta una sola vez, al importar este  archivo
export const env = getEnv();