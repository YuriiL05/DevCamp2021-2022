const db = require('../../configs/db');

module.exports = {
  getAll: async () =>
    db('AccessLevels').select('AccessLevelID as value', 'Name as label'),
};
