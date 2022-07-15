const universitiesStore = require('./usersService');

module.exports = {
  getAll: async () => {
    return await universitiesStore.getAll();
  },
};
