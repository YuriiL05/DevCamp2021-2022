const router = require('express').Router();
const multer = require('../middlewares/multerFilesToS3');
const articlesController = require('../controllers/articlesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', articlesController.get);
router.get('/:id', articlesController.getById);
router.post(
  '/',
  authMiddleware,
  multer.single('file'),
  articlesController.create
);
router.put(
  '/:id',
  authMiddleware,
  multer.single('file'),
  articlesController.updateById
);
router.delete('/:id', authMiddleware, articlesController.deleteById);

module.exports = router;
