import db from '../../configs/db.js';

export default {
  getAll: async () =>
    db('AccessLevels').select('AccessLevelID as value', 'Name as label'),
};
