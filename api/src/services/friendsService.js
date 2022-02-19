const friendsStorage = require('./storage/friendsStorage');

module.exports = {
  getFriends: async (id) => {
    const friendType = 1; // Friend - RelationTypes table
    return await friendsStorage.getFriends(id, friendType);
  },
  getRequestsToFriends: async (id) => {
    const friendType = 2; // RequestToFriend - RelationTypes table
    return await friendsStorage.getFriends(id, friendType);
  },
  addRequestToFriend: async (newData) => {
    const [UserRelationID] = await friendsStorage.addRequestToFriend(newData);
    return UserRelationID;
  },
  addToFriend: async (updatedInfo, id) => {
    await friendsStorage.addToFriend(updatedInfo, id);
    return await friendsStorage.getById(id);
  },
  removeFriend: async (id) => {
    return await friendsStorage.removeFriend(id);
  },
};
