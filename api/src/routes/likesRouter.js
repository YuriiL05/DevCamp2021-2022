import { Router } from 'express';
import likesController from '../controllers/likesController.js';

const router = Router();

router.get('/article/:id', likesController.getAllForArticle);
router.get('/article/:id/user', likesController.getByArticleAndUser);
router.post('/article/:id', likesController.create);
router.delete('/:id', likesController.deleteById);
router.delete('/article/:id/user', likesController.deleteByArticleAndUser);

export default router;
