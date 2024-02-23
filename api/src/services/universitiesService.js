import universitiesStorage from './storage/universitiesStorage.js';

export default {
  getAll: async () => {
    return await universitiesStorage.getAll();
  },
};
