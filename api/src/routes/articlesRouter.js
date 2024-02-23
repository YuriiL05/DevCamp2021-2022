import { Router } from 'express';
import multer from '../middlewares/multerFilesToS3.js';
import articlesController from '../controllers/articlesController.js';
import aclMiddleware from '../middlewares/aclMiddleware.js';
import aclRules from '../configs/acl.rules.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import validationRules from '../configs/validation.rules.js';

const router = Router();

router.get('/', articlesController.get);
router.get('/:id', articlesController.getById);
router.post(
  '/',
  multer.single('file'),
  validationMiddleware(validationRules.article),
  articlesController.create
);
router.put(
  '/:id',
  aclMiddleware(aclRules.articleUpdate),
  multer.single('file'),
  validationMiddleware(validationRules.article),
  articlesController.updateById
);
router.delete(
  '/:id',
  aclMiddleware(aclRules.articleDelete),
  articlesController.deleteById
);

export default router;
