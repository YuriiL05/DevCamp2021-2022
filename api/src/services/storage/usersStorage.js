const db = require('../../configs/db');

module.exports = {
  getAll: async () => db.select().from('Users').orderBy('UserID').timeout(5000),

  getById: async (id) => db('Users').first().where('UserID', id),

  getByEmail: async (email) => db('Users').first().where('Email', email),

  create: async (newUserData) =>
    db('Users').returning('UserID').insert(newUserData),

  updateById: async (updatedInfoUser, id) =>
    db('Users').where('UserID', id).update(updatedInfoUser),

  deleteById: async (id) => db('Users').where('UserID', id).delete(),
};
