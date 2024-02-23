import likesStorage from './storage/likesStorage.js';

export default {
  getAllForArticle: async (articleId) => {
    return await likesStorage.getAllForArticle(articleId);
  },
  getByArticleAndUser: async (articleId, userId) => {
    return await likesStorage.getByArticleAndUser(articleId, userId);
  },
  create: async (newLikeData) => {
    const [newLikeId] = await likesStorage.create(newLikeData);
    return newLikeId;
  },
  deleteById: async (likeId) => {
    return await likesStorage.deleteById(likeId);
  },
  deleteByArticleAndUser: async (articleId, userId) => {
    return await likesStorage.deleteByArticleAndUser(articleId, userId);
  },
};
