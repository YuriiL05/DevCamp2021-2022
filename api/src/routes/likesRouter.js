const router = require('express').Router();
const db = require('../configs/db');

//get likes for the current article
router.get('/article/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const likes = await db('Likes').where({ ArticleID: id }).timeout(10000);

    res.status(200).send(likes);
  } catch (e) {
    res.status(500);
    next({ error: 'Likes cannot be loaded', e });
  }
});

//add likes for the current article
router.post('/article/:id', async (req, res, next) => {
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
router.delete('/article/:id', async (req, res, next) => {
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
