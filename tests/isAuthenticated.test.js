import { describe, it, expect } from 'vitest';
import { isAuthenticated } from '../src/middlewares/auth.middleware.js';
import { generateToken } from '../src/utils/token.js';
import { mockReq, mockRes, mockNext } from './helpers.js';

describe('isAuthenticated', () => {
  it('sin cabecera Authorization → 401', () => {
    const next = mockNext();
    isAuthenticated(mockReq(), mockRes(), next);

    expect(next.mock.calls[0][0].statusCode).toBe(401);
  });

  it('con un token falso → 401', () => {
    const next = mockNext();
    const req = mockReq({ headers: { authorization: 'Bearer esto-no-es-un-token' } });
    isAuthenticated(req, mockRes(), next);

    expect(next.mock.calls[0][0].statusCode).toBe(401);
  });

  it('con un token válido → rellena req.user y llama a next()', () => {
    const token = generateToken({ _id: '6749c0aaaaaaaaaaaaaaaaaa', role: 'user' });
    const req = mockReq({ headers: { authorization: `Bearer ${token}` } });
    const next = mockNext();

    isAuthenticated(req, mockRes(), next);

    expect(next).toHaveBeenCalledWith();
    expect(req.user).toEqual({ id: '6749c0aaaaaaaaaaaaaaaaaa', role: 'user' });
  });
});