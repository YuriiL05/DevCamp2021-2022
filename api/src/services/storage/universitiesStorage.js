import db from '../../configs/db.js';

export default {
  getAll: async () =>
    db('Universities')
      .select('UniversityID as UnId', 'Name as UniversityName')
      .orderBy('UniversityID', 'asc')
      .timeout(1000),
};
