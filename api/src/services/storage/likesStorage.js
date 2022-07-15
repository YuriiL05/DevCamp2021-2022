const db = require('../../configs/db');

module.exports = {
  getAllForArticle: async (articleId) =>
    db('Likes').where({ ArticleID: articleId }).timeout(10000),

  getByArticleAndUser: async (articleId, userId) =>
    db('Likes').where({ ArticleID: articleId, UserID: userId }).timeout(10000),

  create: async (newLikeData) =>
    db('Likes').returning('LikeID').insert(newLikeData),

  deleteById: async (id) => db('Likes').where({ LikeID: id }).delete(),
};
