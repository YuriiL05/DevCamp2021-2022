import asyncHandler from '../common/asyncHandler.js';
import commentsService from '../services/commentsService.js';

export default {
  getAllForArticle: asyncHandler(async (req, res) => {
    const articleId = req.params.id;
    const comments = await commentsService.getAllForArticle(articleId);

    res.status(200).send(comments);
  }),
  getById: asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const comment = await commentsService.getById(commentId);

    res.status(200).send(comment);
  }),
  getUserByCommentId: asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const user = await commentsService.getUserByCommentId(commentId);

    res.status(200).send(user);
  }),
  create: asyncHandler(async (req, res) => {
    const commentBody = req.body;
    const { UserID } = req.auth;

    const newCommentData = {
      ...commentBody,
      UserID,
      CreateDate: new Date().toISOString(),
    };
    const newCommentId = await commentsService.create(newCommentData);

    res.status(200).send({ CommentID: newCommentId });
  }),
  updateById: asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const { Text } = req.body;

    const comment = await commentsService.getById(commentId);

    const updatedCommentData = {
      ...comment,
      Text,
      UpdateDate: new Date().toISOString(),
    };

    const updatedComment = await commentsService.updateById(
      commentId,
      updatedCommentData
    );

    res.status(200).send(updatedComment);
  }),
  deleteById: asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const isDeleted = await commentsService.deleteById(commentId);

    res
      .status(200)
      .send(isDeleted ? `Comment is deleted` : `Comment is absent`);
  }),
};
