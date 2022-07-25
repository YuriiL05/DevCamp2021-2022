const db = require('../../configs/db');

module.exports = {
  getAll: async () =>
    db('Universities')
      .select('UniversityID as UnId', 'Name as UniversityName')
      .orderBy('UniversityID', 'asc')
      .timeout(1000),
};
