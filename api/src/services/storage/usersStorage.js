import db from '../../configs/db.js';

const usersStorage = {
  getAll: async () => db.select().from('Users').orderBy('UserID').timeout(5000),

  getById: async (id) =>
    db('Users')
      .leftJoin(
        'Universities',
        'Users.UniversityID',
        '=',
        'Universities.UniversityID'
      )
      .select(
        'Users.UserID as UserID',
        'Avatar',
        'FirstName',
        'LastName',
        'Email',
        'Phone',
        'Name as UniversityName',
        'Users.UniversityID'
      )
      .first()
      .where('UserID', id),

  getRoleById: async (id) =>
    db('Users')
      .leftJoin('UserRole', 'Users.UserID', '=', 'UserRole.UserID')
      .join('Roles', 'UserRole.RoleID', '=', 'Roles.RoleID')
      .select('Users.UserID as UserID', 'Roles.slug as role')
      .first()
      .where('Users.UserID', id),

  getByEmail: async (email) => db('Users').first().where('Email', email),

  create: async (newUserData) =>
    db('Users').returning('UserID').insert(newUserData),

  updateById: async (updatedInfoUser, id) =>
    db('Users').where('UserID', id).update(updatedInfoUser),

  deleteById: async (id) => db('Users').where('UserID', id).delete(),
};

export default usersStorage;
