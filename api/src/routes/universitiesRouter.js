import universitiesController from '../controllers/universitiesController.js';
import { Router } from 'express';

const router = Router();

router.get('/', universitiesController.getAll);

export default router;
