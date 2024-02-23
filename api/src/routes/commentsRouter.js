import { Router } from 'express';
import commentsController from '../controllers/commentsController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import validationRules from '../configs/validation.rules.js';

const router = Router();

router.get('/article/:id', commentsController.getAllForArticle);
router.get('/:id', commentsController.getById);
router.get('/:id/user', commentsController.getUserByCommentId);
router.post(
  '/',
  validationMiddleware(validationRules.comment),
  commentsController.create
);
router.put(
  '/:id',
  validationMiddleware(validationRules.comment),
  commentsController.updateById
);
router.delete('/:commentId', commentsController.deleteById);

export default router;
