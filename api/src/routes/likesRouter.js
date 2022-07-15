const router = require('express').Router();
const likesController = require('../controllers/likesController');

router.get('/article/:id', likesController.getAllForArticle);
router.get('/article/:id/user', likesController.getByArticleAndUser);
router.post('/article/:id', likesController.create);
router.delete('/:id', likesController.deleteById);

module.exports = router;
