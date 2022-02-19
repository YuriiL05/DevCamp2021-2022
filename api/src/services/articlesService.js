const articlesStorage = require('./storage/articlesStorage');

module.exports = {
  getAll: async () => {
    return await articlesStorage.getAll();
  },
  getById: async (id) => {
    return await articlesStorage.getById(id);
  },
  create: async (newData) => {
    const [newArticleId] = await articlesStorage.create(newData);
    return newArticleId;
  },
  updateById: async (updatedInfo, id) => {
    await articlesStorage.updateById(updatedInfo, id);
    return await articlesStorage.getById(id);
  },
  deleteById: async (id) => {
    return await articlesStorage.deleteById(id);
  },
};
