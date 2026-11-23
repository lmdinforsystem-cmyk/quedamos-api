import  jwt from 'jsonwebtoken';

//Crea un token firmado con el id y el rol del usuario
export function generateToken(user) {
    return jwt.sign(
        {
            id: user._id.toString(), 
            role: user.role
        },
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_SECRET_IN || '1d'}
    );
}

//comprueba la firma y la caducidad
export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}