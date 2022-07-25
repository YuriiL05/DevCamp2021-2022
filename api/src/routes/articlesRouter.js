const router = require('express').Router();
const multer = require('../middlewares/multerFilesToS3');
const articlesController = require('../controllers/articlesController');
const aclMiddleware = require('../middlewares/aclMiddleware');
const { articleUpdate, articleDelete } = require('../configs/acl.rules');
const validationMiddleware = require('../middlewares/validationMiddleware');
const validationRules = require('../configs/validation.rules');

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
  aclMiddleware(articleUpdate),
  multer.single('file'),
  validationMiddleware(validationRules.article),
  articlesController.updateById
);
router.delete(
  '/:id',
  aclMiddleware(articleDelete),
  articlesController.deleteById
);

module.exports = router;
