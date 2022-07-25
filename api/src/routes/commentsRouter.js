const router = require('express').Router();
const commentsController = require('../controllers/commentsController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const validationRules = require('../configs/validation.rules');

router.get('/article/:id', commentsController.getAllForArticle);
router.get('/:id', commentsController.getById);
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

module.exports = router;
