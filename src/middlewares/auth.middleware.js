import AppError from '../utils/AppError.js';
import { verifyToken } from '../utils/token.js';

function getToken(req) {
    const authorization = req.headers.authorization;
    if (authorization?.startsWith('Bearer')) {
        return authorization.split(' ')[1];
    }

    return undefined;
}

//comrpueba el token y guarda el usuario en req.user
export function isAuthenticated(req, res, next) {
    const token = getToken(req);
    if (!token) {
        return next(new AppError('No hay token de autenticación', 401));

    }

    try {
        // verifyToken LANZA un error si el token es falso o ha caducado
        const payload = verifyToken(token);
        req.user = { id: payload.id, role: payload.role };
        next();
    } catch {
        next(new AppError('Tokrn no válido o caducado', 401));
    }

}

//solo deja pasar a los admin Va siempre después de isAuthenticated
export function isAdmin(req, res, next) {
    if (!req.user) {
        return next(new AppError('No hay token de autenticación', 401));

    }
    if (req.user.role !== 'admin') {
        return next(new AppError('No tienes perimo para realizar esta acción', 403));

    }
    next();
}