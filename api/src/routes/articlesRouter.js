const router = require('express').Router();
const db = require('../configs/db');
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

//get likes for the current article
router.get('/:id/likes', async (req, res, next) => {
  const id = req.params.id;

  try {
    const likes = await db('Likes').where({ ArticleID: id }).timeout(10000);

    res.status(200).send(likes);
  } catch (e) {
    res.status(500);
    next({ error: 'Likes cannot be loaded', e });
  }
});

//get all comments for an article
router.get('/:id/comments', async (req, res, next) => {
  const id = req.params.id;

  if (Number.isInteger(+id)) {
    try {
      const comments = await db('Comments')
        .where({ ArticleID: id })
        .timeout(10000);

      if (comments.length > 0) {
        res.status(200).send(comments);
      } else {
        res.status(404);
        next({ error: `Comments for article Id: ${id} is absent` });
      }
    } catch (e) {
      res.status(500);
      next({ error: 'Comments cannot be loaded', e });
    }
  } else {
    res.status(400);
    next({ error: 'Article Id is not correct' });
  }
});

//add likes for the current article
router.post('/:id/likes', async (req, res, next) => {
  const articleId = req.params.id;
  const userId = req.body.UserID;

  try {
    await db('Likes').insert({
      UserID: userId,
      ArticleID: articleId,
    });

    res.status(200).send('New like was added');
  } catch (e) {
    res.status(500);
    next({ error: 'Lake cannot be added', e });
  }
});

//remove likes for the current article
router.delete('/:id/likes/:userId', async (req, res, next) => {
  const articleId = req.params.id;
  const userId = req.params.userId;

  try {
    const isDeleted = await db('Likes')
      .where({ ArticleID: articleId, UserID: userId })
      .delete();

    res.send(
      isDeleted
        ? `Like for user Id: ${userId} is deleted`
        : `Like for user Id: ${userId} is absent`
    );
  } catch (e) {
    res.status(500);
    next({ error: 'Like cannot be deleted', e });
  }
});

module.exports = router;
