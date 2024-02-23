import accessLevelsStorage from './storage/accessLevelsStorage.js';

export default {
  getAll: async () => {
    return await accessLevelsStorage.getAll();
  },
};
