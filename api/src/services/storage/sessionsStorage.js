const db = require('../../configs/db');

module.exports = {
  getAll: async () =>
    db.select().from('Sessions').orderBy('UserID').timeout(5000),

  getByToken: async (refreshToken) =>
    db('Sessions').first().where('Token', refreshToken),

  create: async (newSession) =>
    db('Sessions').returning('UserID').insert(newSession),

  updateById: async (updatedInfoUser, id) =>
    db('Sessions').where('UserID', id).update(updatedInfoUser),

  deleteByToken: async (refreshToken) =>
    db('Sessions').where('Token', refreshToken).delete(),
};
