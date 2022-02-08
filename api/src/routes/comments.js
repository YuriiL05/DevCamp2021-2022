const router = require('express').Router();
const db = require('../services/db');

//get comment by id for an article
router.get('/:commentId', async (req, res, next) => {
  const { commentId } = req.params;

  if (Number.isInteger(+commentId)) {
    try {
      const comment = await db('Comments')
        .where({ CommentID: commentId })
        .first();

      if (comment) {
        res.status(200).send(comment);
      } else {
        res.status(404);
        next({ error: `Comment with Id: ${commentId} is absent` });
      }
    } catch (e) {
      res.status(500);
      next({ error: 'Comment cannot be loaded', e });
    }
  } else {
    res.status(400);
    next({ error: 'Comment Id is not correct' });
  }
});

//add a new comment to an article
router.post('/', async (req, res, next) => {
  const newComment = req.body;

  if (Object.keys(newComment).length > 0) {
    try {
      const insertedComment = await db('Comments')
        .returning('*')
        .insert(newComment);

      res.status(200).send(insertedComment[0]);
    } catch (e) {
      res.status(500);
      next({ error: 'Comment cannot be added', e });
    }
  } else {
    res.status(400);
    next({ error: 'Comment information is empty' });
  }
});

//update the comment
router.put('/:commentId', async (req, res, next) => {
  const { commentId } = req.params;
  const commentUpdates = req.body;

  if (Number.isInteger(+commentId)) {
    try {
      const comment = await db('Comments')
        .where({ CommentID: commentId })
        .first();

      if (comment) {
        const updatedInfoComment = { ...comment, ...commentUpdates };

        await db('Comments')
          .where({ CommentID: commentId })
          .update(updatedInfoComment);

        res.status(200).send(updatedInfoComment);
      } else {
        res.status(404);
        next({ error: `Comment with Id: ${commentId} is not found` });
      }
    } catch (e) {
      res.status(500);
      next({ error: 'Comment cannot be loaded', e });
    }
  } else {
    res.status(400);
    next({ error: 'Comment Id is not correct' });
  }
});

//delete the comment
router.delete('/:commentId', async (req, res, next) => {
  const { commentId } = req.params;

  if (Number.isInteger(+commentId)) {
    try {
      const isDeleted = await db('Comments')
        .where({ CommentID: commentId })
        .delete();

      res.send(
        isDeleted
          ? `Comment with Id: ${commentId} is deleted`
          : `Comment with Id: ${commentId} is absent`
      );
    } catch (e) {
      res.status(500);
      next({ error: 'Comment cannot be deleted', e });
    }
  } else {
    res.status(400);
    next({ error: 'Comment Id is not correct' });
  }
});

module.exports = router;
