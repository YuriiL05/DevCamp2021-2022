const router = require('express').Router();
const multer = require('../middlewares/multerToS3');
const userController = require('../controllers/usersController');
const aclMiddleware = require('../middlewares/aclMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const aclRules = require('../configs/acl.rules');
const validationRules = require('../configs/validation.rules');

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

module.exports = router;
