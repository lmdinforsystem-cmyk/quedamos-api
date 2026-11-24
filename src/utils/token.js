import  jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

//Crea un token firmado con el id y el rol del usuario
export function generateToken(user) {
    return jwt.sign(
        {
            id: user._id.toString(), 
            role: user.role
        },
        env.JWT_SECRET, 
        {expiresIn: env.JWT_EXPIRES_IN}
    );
}

//comprueba la firma y la caducidad
export function verifyToken(token) {
    return jwt.verify(token, env.JWT_SECRET);
}