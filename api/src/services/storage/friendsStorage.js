const db = require('../../configs/db');

module.exports = {
  getFriends: async (id, friendType) =>
    db('UserFriends')
      .select()
      .from(function () {
        this.select('UserRelationID', 'ReceiverID as FriendID')
          .from('UserRelations')
          .where({ UserID: id, RelationTypeID: friendType })
          .union(function () {
            this.select('UserRelationID', 'UserID as FriendID')
              .from('UserRelations')
              .where({ ReceiverID: id, RelationTypeID: friendType });
          })
          .as('UserFriends');
      })
      .join('Users', 'UserFriends.FriendID', '=', 'Users.UserID')
      .timeout(5000),

  getById: async (id) =>
    db('UserRelations').select().where('UserRelationID', id),

  addRequestToFriend: async (newRequestData) =>
    db('UserRelations').returning('UserRelationID').insert(newRequestData),

  addToFriend: async (updatedRequestType, id) =>
    db('UserRelations').where('UserRelationID', id).update(updatedRequestType),

  removeFriend: async (id) =>
    db('UserRelations').where('UserRelationID', id).delete(),
};
