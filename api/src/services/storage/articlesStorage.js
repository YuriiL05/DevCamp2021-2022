const db = require('../../configs/db');

module.exports = {
  getAll: async (limitArticles, skipArticles) =>
    db('Articles')
      .join('Users', 'Articles.UserID', '=', 'Users.UserID')
      .select(
        'ArticleID',
        'Articles.UserID as UserID',
        'AccessLevelID',
        'Avatar',
        'Body',
        'Date',
        'FirstName',
        'LastName',
        'Title'
      )
      .orderBy('ArticleID', 'desc')
      .limit(limitArticles || 10)
      .offset(skipArticles || 0)
      .timeout(5000),

  getById: async (id) => db('Articles').first().where('ArticleID', id),

  create: async (newArticleData) =>
    db('Articles').returning('ArticleID').insert(newArticleData),

  updateById: async (updatedInfoArticle, id) =>
    db('Articles').where('ArticleID', id).update(updatedInfoArticle),

  deleteById: async (id) => db('Articles').where('ArticleID', id).delete(),
};
