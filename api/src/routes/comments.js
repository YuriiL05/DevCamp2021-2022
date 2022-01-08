const router = require('express').Router();
const db = require('../services/db');

//get comment by id for an article
router.get('/:commentId', async (req, res) => {
  const { commentId } = req.params;

  if (Number.isInteger(+commentId)) {
    try {
      const comment = await db('Comments').where({ CommentID: commentId });

      if (comment.length > 0) {
        res.status(200).send(comment);
      } else {
        res
          .status(404)
          .send({ error: `Comment with Id: ${commentId} is absent` });
      }
    } catch (e) {
      res.status(500).send({ error: 'Comment cannot be loaded', e });
    }
  } else {
    res.status(400).send({ error: 'Comment Id is not correct' });
  }
});

//add a new comment to an article
router.post('/', async (req, res) => {
  const newComment = req.body;

  if (Object.keys(newComment).length > 0) {
    try {
      const insertedComment = await db('Comments')
        .returning('*')
        .insert(newComment);

      res.status(200).send(insertedComment[0]);
    } catch (e) {
      res.status(500).send({ error: 'Comment cannot be added', e });
    }
  } else {
    res.status(400).send({ error: 'Comment information is empty' });
  }
});

//update the comment
router.put('/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const commentUpdates = req.body;

  if (Number.isInteger(+commentId)) {
    try {
      const comment = await db('Comments').where({ CommentID: commentId });

      if (comment.length > 0) {
        const updatedInfoComment = { ...comment[0], ...commentUpdates };

        await db('Comments')
          .where({ CommentID: commentId })
          .update(updatedInfoComment);

        res.status(200).send(updatedInfoComment);
      } else {
        res
          .status(404)
          .send({ error: `Comment with Id: ${commentId} is not found` });
      }
    } catch (e) {
      res.status(500).send({ error: 'Comment cannot be loaded', e });
    }
  } else {
    res.status(400).send({ error: 'Comment Id is not correct' });
  }
});

//delete the comment
router.delete('/:commentId', async (req, res) => {
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
      res.status(500).send({ error: 'Comment cannot be deleted', e });
    }
  } else {
    res.status(400).send({ error: 'Comment Id is not correct' });
  }
});

module.exports = router;
