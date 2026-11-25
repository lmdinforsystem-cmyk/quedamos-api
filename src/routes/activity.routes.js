import { Router } from "express";
import * as activityController from '../controllers/activity.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'

const router = Router();

//consultar  es público: crear requiere login
router.get('/', activityController.list);
router.get('/:id', activityController.getById);
router.post('/', isAuthenticated, activityController.create);

export default router;