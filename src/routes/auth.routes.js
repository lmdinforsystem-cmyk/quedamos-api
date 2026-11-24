import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = Router();

// POST /api/auth/register → registro
router.post('/register', authController.register);

// POST /api/auth/login -> login
router.post('/login', authController.login);

//GET /api/auth/me -> datos del usuario logueado (require token)
router.get('/me', isAuthenticated, authController.me);

export default router;
