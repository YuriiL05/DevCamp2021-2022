import db from '../../configs/db.js';

export default {
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

  addToFriend: async (UserID, ReceiverID, toFriend) =>
    db('UserRelations')
      .where({ UserID: UserID, ReceiverID: ReceiverID })
      .update(toFriend),

  removeFriend: async (UserRelationID, id) =>
    db('UserRelations')
      .where(function () {
        this.where('UserID', id).orWhere('ReceiverID', id);
      })
      .andWhere('UserRelationID', UserRelationID)
      .delete(),
};
