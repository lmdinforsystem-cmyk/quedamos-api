import { Router } from 'express';
import authRoutes from './auth.routes.js';
import activityRoutes from './activity.routes.js';

const router = Router();

router.get('/health', (req, res) =>{
    res.status(200).json({ status: 'ok'});
});

router.use('/auth', authRoutes);
router.use('/activities', activityRoutes);

export default router;