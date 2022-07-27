const db = require('../../configs/db');

module.exports = {
  getAllForArticle: async (articleId) =>
    db('Comments').where({ ArticleID: articleId }).timeout(5000),

  getById: async (commentId) =>
    db('Comments').where({ CommentID: commentId }).first(),

  getUserByCommentId: async (commentId) =>
    db('Comments')
      .select('Users.UserID', 'FirstName', 'LastName', 'Avatar')
      .join('Users', 'Users.UserID', 'Comments.UserID')
      .where('Comments.CommentID', commentId)
      .first(),

  create: async (newCommentData) =>
    db('Comments').returning('CommentID').insert(newCommentData),

  updateById: async (commentId, updatedCommentData) =>
    db('Comments').where({ CommentID: commentId }).update(updatedCommentData),

  deleteById: async (commentId) =>
    db('Comments').where({ CommentID: commentId }).delete(),
};
