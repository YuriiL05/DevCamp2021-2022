const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
  const { skipArticles } = req.query;

  try {
    const articles = await db
      .select()
      .from('Articles')
      .orderBy('ArticleID')
      .limit(10)
      .offset(skipArticles)
      .timeout(10000);

    res.status(200).send(articles);
  } catch (e) {
    res.status(500).send({ error: 'Articles cannot be loaded', e });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (Number.isInteger(+id)) {
    try {
      const article = await db('Articles').where({ ArticleID: id });
      if (article.length > 0) {
        res.status(200).send(article);
      } else {
        res.status(404).send({ error: `Article with Id: ${id} is not found` });
      }
    } catch (e) {
      res.status(500).send({ error: 'Article cannot be loaded', e });
    }
  } else {
    res.status(400).send({ error: 'Article Id is not correct' });
  }
});

router.post('/', async (req, res) => {
  const newArticleData = req.body;

  if (Object.keys(newArticleData).length > 0) {
    try {
      await db('Articles').insert(newArticleData);

      res.status(200).send('New article was added');
    } catch (e) {
      res.status(500).send({ error: 'Article cannot be added', e });
    }
  } else {
    res.status(400).send({ error: 'Article information is empty' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const articleUpdates = req.body;

  if (Number.isInteger(+id)) {
    try {
      const article = await db('Articles').where({ ArticleID: id });
      if (article.length > 0) {
        const updatedInfoArticle = { ...article[0], ...articleUpdates };

        await db('Articles')
          .where({ ArticleID: id })
          .update(updatedInfoArticle);

        res.status(200).send(updatedInfoArticle);
      } else {
        res.status(404).send({ error: `Article with Id: ${id} is not found` });
      }
    } catch (e) {
      res.status(500).send({ error: 'Article cannot be loaded', e });
    }
  } else {
    res.status(400).send({ error: 'Article Id is not correct' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  if (Number.isInteger(+id)) {
    try {
      const isDeleted = await db('Articles').where({ ArticleID: id }).delete();

      res.send(
        isDeleted
          ? `Article with Id: ${id} is deleted`
          : `Article with Id: ${id} is absent`
      );
    } catch (e) {
      res.status(500).send({ error: 'Article cannot be deleted', e });
    }
  } else {
    res.status(400).send({ error: 'Article Id is not correct' });
  }
});

module.exports = router;
