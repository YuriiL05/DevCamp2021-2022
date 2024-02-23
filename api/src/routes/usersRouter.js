import { Router } from 'express';
import multer from '../middlewares/multerToS3.js';
import userController from '../controllers/usersController.js';
import aclMiddleware from '../middlewares/aclMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import aclRules from '../configs/acl.rules.js';
import validationRules from '../configs/validation.rules.js';

const router = Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post(
  '/',
  aclMiddleware(aclRules.userCreate),
  validationMiddleware(validationRules.user),
  userController.create
);
router.put(
  '/:id',
  aclMiddleware(aclRules.userUpdate),
  validationMiddleware(validationRules.user),
  userController.updateById
);
router.put(
  '/:id/avatar',
  aclMiddleware(aclRules.userUpdate),
  validationMiddleware(validationRules.avatar),
  multer.single('avatar'),
  userController.updateAvatar
);
router.delete(
  '/:id',
  aclMiddleware(aclRules.userDelete),
  userController.deleteById
);

export default router;
