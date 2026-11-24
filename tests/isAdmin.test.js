import { describe, it, expect } from 'vitest';
import { isAdmin } from '../src/middlewares/auth.middleware.js';
import AppError from '../src/utils/AppError.js';
import { ana, admin, mockReq, mockRes, mockNext } from './helpers.js';

describe('isAdmin', () => {
  it('sin usuario (no ha pasado por isAuthenticated) → 401', () => {
    const next = mockNext();
    isAdmin(mockReq(), mockRes(), next);

    const error = next.mock.calls[0][0];
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(401);
  });

  it('un usuario normal → 403', () => {
    const next = mockNext();
    isAdmin(mockReq({ user: ana }), mockRes(), next);

    expect(next.mock.calls[0][0].statusCode).toBe(403);
  });

  it('un admin → next() sin error', () => {
    const next = mockNext();
    isAdmin(mockReq({ user: admin }), mockRes(), next);

    expect(next).toHaveBeenCalledWith();
  });

  it('nunca responde él mismo: deja la respuesta al errorHandler', () => {
    const res = mockRes();
    isAdmin(mockReq({ user: ana }), res, mockNext());

    expect(res.status).not.toHaveBeenCalled();
  });
});