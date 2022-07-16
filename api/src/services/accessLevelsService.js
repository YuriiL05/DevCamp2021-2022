const accessLevelsStorage = require('./storage/accessLevelsStorage');

module.exports = {
  getAll: async () => {
    return await accessLevelsStorage.getAll();
  },
};
