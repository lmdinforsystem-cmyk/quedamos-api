import { json } from 'express';
import{ vi } from 'vitest';
// Usuarios de prueba (como los que isAuthenticated guarda en req.user)
export const ana = { id:'6749c0aaaaaaaaaaaaaaaaaa', role: 'user'};
export const admin = {id:'6749c2cccccccccccccccccc', role: 'admin'};

// Un req falso con solo lo que usan los middlewares
export function mockReq(data = {}) {
    return {headers: {}, ...data };
}

// Un res falso: status() devuelve el propio res para poder encadenar .json()
export function mockRes() {
    const res = {
        status: vi.fn(),
        json: vi.fn(),
    };
    res.status.mockReturnValue(res);
    res.json.mockReturnValue(res);
    return res;
}

// Un next falso: vi.fn() recuerda con qué argumentos se le llamó
export function mockNext() {
    return vi.fn();
}