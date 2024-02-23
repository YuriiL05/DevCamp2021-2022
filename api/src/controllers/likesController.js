import asyncHandler from '../common/asyncHandler.js';
import likesService from '../services/likesService.js';

export default {
  getAllForArticle: asyncHandler(async (req, res) => {
    const articleId = req.params.id;
    const likes = await likesService.getAllForArticle(articleId);

    res.status(200).send(likes);
  }),
  getByArticleAndUser: asyncHandler(async (req, res) => {
    const articleId = req.params.id;
    const userId = req.auth.UserID;
    const like = await likesService.getByArticleAndUser(articleId, userId);

    res.status(200).send(like);
  }),
  create: asyncHandler(async (req, res) => {
    const newLikeData = {
      UserID: req.auth.UserID,
      ArticleID: req.params.id,
    };
    const newLikeId = await likesService.create(newLikeData);

    res.status(200).send({ newLikeId });
  }),
  deleteById: asyncHandler(async (req, res) => {
    const likeId = req.params.id;
    const isDeleted = await likesService.deleteById(likeId);

    res.status(200).send(isDeleted ? `Like is deleted` : `Like is absent`);
  }),
  deleteByArticleAndUser: asyncHandler(async (req, res) => {
    const articleId = req.params.id;
    const userId = req.auth.UserID;
    const isDeleted = await likesService.deleteByArticleAndUser(
      articleId,
      userId
    );

    res.status(200).send(isDeleted ? `Like is deleted` : `Like is absent`);
  }),
};
