const router = require('express').Router();
const multer = require('../middlewares/multerToS3');
const userController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const aclMiddleware = require('../middlewares/aclMiddleware');
const { userDelete, userUpdate, userCreate } = require('../configs/acl.rules');

router.use(authMiddleware);
router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post('/', aclMiddleware(userCreate), userController.create);
router.put('/:id', aclMiddleware(userUpdate), userController.updateById);
router.put(
  '/:id/avatar',
  aclMiddleware(userUpdate),
  multer.single('avatar'),
  userController.updateAvatar
);
router.delete('/:id', aclMiddleware(userDelete), userController.deleteById);

module.exports = router;
