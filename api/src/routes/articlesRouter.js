const router = require('express').Router();
const multer = require('../middlewares/multerFilesToS3');
const articlesController = require('../controllers/articlesController');
const authMiddleware = require('../middlewares/authMiddleware');
const aclMiddleware = require('../middlewares/aclMiddleware');
const { articleUpdate, articleDelete } = require('../configs/acl.rules');

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
  aclMiddleware(articleUpdate),
  multer.single('file'),
  articlesController.updateById
);
router.delete(
  '/:id',
  authMiddleware,
  aclMiddleware(articleDelete),
  articlesController.deleteById
);

module.exports = router;
