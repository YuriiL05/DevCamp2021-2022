import db from '../../configs/db.js';

export default {
  getAllForArticle: async (articleId) =>
    db('Likes')
      .select('LikeID', 'Likes.UserID', 'Avatar', 'FirstName', 'LastName')
      .join('Users', 'Users.UserID', 'Likes.UserID')
      .where('Likes.ArticleID', articleId)
      .timeout(10000),

  getByArticleAndUser: async (articleId, userId) =>
    db('Likes').where({ ArticleID: articleId, UserID: userId }).timeout(10000),

  create: async (newLikeData) =>
    db('Likes').returning('LikeID').insert(newLikeData),

  deleteById: async (id) => db('Likes').where({ LikeID: id }).delete(),

  deleteByArticleAndUser: async (articleId, userId) =>
    db('Likes').where({ ArticleID: articleId, UserID: userId }).delete(),
};
