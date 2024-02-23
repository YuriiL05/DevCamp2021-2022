import friendsStorage from './storage/friendsStorage.js';

//RelationTypes table
const FRIEND_TYPE = {
  Friend: 1,
  RequestToFriend: 2,
};

export default {
  getFriendsId: async (id) => {
    return await friendsStorage.getFriends(id, FRIEND_TYPE.Friend);
  },
  getRequestsToFriendsId: async (id) => {
    return await friendsStorage.getFriends(id, FRIEND_TYPE.RequestToFriend);
  },
  addRequestToFriend: async (UserID, ReceiverID) => {
    const newRequest = {
      UserID,
      ReceiverID,
      RelationTypeID: FRIEND_TYPE.RequestToFriend,
    };
    const [UserRelationID] =
      await friendsStorage.addRequestToFriend(newRequest);
    return UserRelationID;
  },
  addToFriend: async (UserID, ReceiverID) => {
    const toFriend = {
      RelationTypeID: FRIEND_TYPE.RequestToFriend,
    };
    return await friendsStorage.addToFriend(UserID, ReceiverID, toFriend);
  },
  removeFriend: async (UserRelationID, id) => {
    return await friendsStorage.removeFriend(UserRelationID, id);
  },
};
