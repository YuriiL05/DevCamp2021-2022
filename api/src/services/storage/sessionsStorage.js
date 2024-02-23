import db from '../../configs/db.js';

export default {
  getCountForUser: async (id) =>
    db.select().first().count().from('Sessions').where('UserID', id),

  getByToken: async (refreshToken) =>
    db('Sessions').first().where('Token', refreshToken),

  create: async (newSession) =>
    db('Sessions').returning('UserID').insert(newSession),

  deleteAllForUser: async (id) => db('Sessions').where('UserID', id).delete(),

  deleteByToken: async (refreshToken) =>
    db('Sessions').where('Token', refreshToken).delete(),
};
