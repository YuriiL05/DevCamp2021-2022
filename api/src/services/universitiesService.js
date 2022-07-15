const universitiesStorage = require('./storage/universitiesStorage');

module.exports = {
  getAll: async () => {
    return await universitiesStorage.getAll();
  },
};
