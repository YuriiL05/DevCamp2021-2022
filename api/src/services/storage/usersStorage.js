const db = require('../../configs/db');

module.exports = {
  getAll: async () => db.select().from('Users').orderBy('UserID').timeout(5000),

  getById: async (id) =>
    db('Users')
      .join(
        'Universities',
        'Users.UniversityID',
        '=',
        'Universities.UniversityID'
      )
      .first()
      .where('UserID', id),

  create: async (newUserData) =>
    db('Users').returning('UserID').insert(newUserData),

  updateById: async (updatedInfoUser, id) =>
    db('Users').where('UserID', id).update(updatedInfoUser),

  deleteById: async (id) => db('Users').where('UserID', id).delete(),
};
