const router = require('express').Router();
const commentsController = require('../controllers/commentsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/article/:id', commentsController.getAllForArticle);
router.get('/:id', commentsController.getById);
router.post('/', commentsController.create);
router.put('/:id', commentsController.updateById);
router.delete('/:commentId', commentsController.deleteById);

module.exports = router;
