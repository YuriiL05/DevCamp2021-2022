const router = require('express').Router();
const multer = require('../middlewares/multerToS3');
const userController = require('../controllers/usersController');

router.get('/', userController.get);
router.get('/:id', userController.getById);
router.get('/:id/friends', userController.getFriends);
router.post('/', userController.create);
router.put('/:id', userController.updateById);
router.put('/:id/avatar', multer.single('avatar'), userController.updateAvatar);
router.delete('/:id', userController.deleteById);

module.exports = router;
