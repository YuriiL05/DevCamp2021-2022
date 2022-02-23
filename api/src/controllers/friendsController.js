const asyncHandler = require('../common/asyncHandler');
const friendsService = require('../services/friendsService');
const NotFoundException = require('../errors/NotFoundException');

module.exports = {
  getFriends: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const friends = await friendsService.getFriendsId(id);

    if (friends.length === 0) {
      throw new NotFoundException('Friends not found');
    } else {
      res.status(200).send(friends);
    }
  }),

  getRequestsToFriends: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const reqToFriends = await friendsService.getRequestsToFriendsId(id);

    if (reqToFriends.length === 0) {
      throw new NotFoundException('Requests to Friends not found');
    } else {
      res.status(200).send(reqToFriends);
    }
  }),

  addRequestToFriend: asyncHandler(async (req, res) => {
    const UserID = req.auth.UserID;
    const ReceiverID = req.params.id;

    const newUserRelationID = await friendsService.addRequestToFriend(
      UserID,
      ReceiverID
    );
    res.status(201).send({ id: newUserRelationID });
  }),

  updateToFriend: asyncHandler(async (req, res) => {
    const ReceiverID = req.auth.id;
    const UserID = req.params.id;

    const updatedUser = await friendsService.addToFriend(UserID, ReceiverID);

    res.status(201).send(updatedUser);
  }),

  removeFriend: asyncHandler(async (req, res) => {
    const id = req.auth.id;
    const UserRelationID = req.params.requestId;
    const isDeleted = await friendsService.removeFriend(UserRelationID, id);

    res.status(200).send(isDeleted ? `Friend is removed` : `Friend is absent`);
  }),
};
