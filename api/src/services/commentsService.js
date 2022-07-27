const commentsStorage = require('./storage/commentsStorage');

module.exports = {
  getAllForArticle: async (articleId) => {
    return await commentsStorage.getAllForArticle(articleId);
  },
  getById: async (commentId) => {
    return await commentsStorage.getById(commentId);
  },
  getUserByCommentId: async (commentId) => {
    return await commentsStorage.getUserByCommentId(commentId);
  },
  create: async (newCommentData) => {
    const [newCommentId] = await commentsStorage.create(newCommentData);
    return newCommentId;
  },
  updateById: async (commentId, updatedCommentData) => {
    await commentsStorage.updateById(commentId, updatedCommentData);
    return await commentsStorage.getById(commentId);
  },
  deleteById: async (commentId) => {
    return await commentsStorage.deleteById(commentId);
  },
};
