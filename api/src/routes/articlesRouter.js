const router = require('express').Router();
const multer = require('../middlewares/multerFilesToS3');
const articlesController = require('../controllers/articlesController');
const authMiddleware = require('../middlewares/authMiddleware');
const aclMiddleware = require('../middlewares/aclMiddleware');
const { articleUpdate, articleDelete } = require('../configs/acl.rules');
const validationMiddleware = require('../middlewares/validationMiddleware');
const validationRules = require('../configs/validation.rules');

router.get('/', articlesController.get);
router.get('/:id', articlesController.getById);
router.post(
  '/',
  authMiddleware,
  validationMiddleware(validationRules.article),
  multer.single('file'),
  articlesController.create
);
router.put(
  '/:id',
  authMiddleware,
  aclMiddleware(articleUpdate),
  validationMiddleware(validationRules.article),
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
