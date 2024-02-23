import accessLevelsController from '../controllers/accessLevelsController.js';
import { Router } from 'express';

const router = Router();

router.get('/', accessLevelsController.getAll);

export default router;
