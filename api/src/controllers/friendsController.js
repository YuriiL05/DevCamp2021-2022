const asyncHandler = require('../common/asyncHandler');
const friendsService = require('../services/friendsService');
const NotFoundException = require('../errors/NotFoundException');
const BadRequestException = require('../errors/BadRequestException');

module.exports = {
  getFriends: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const friends = await friendsService.getFriends(id);

    if (friends.length === 0) {
      throw new NotFoundException('Friends not found');
    } else {
      res.status(200).send(friends);
    }
  }),

  getRequestsToFriends: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const reqToFriends = await friendsService.getRequestsToFriends(id);

    if (reqToFriends.length === 0) {
      throw new NotFoundException('Requests to Friends not found');
    } else {
      res.status(200).send(reqToFriends);
    }
  }),

  addRequestToFriend: asyncHandler(async (req, res) => {
    const newUserData = req.body;

    if (Object.keys(newUserData).length > 0) {
      const newUserId = await friendsService.create(newUserData);
      res.status(201).send({ id: newUserId });
    } else {
      throw new BadRequestException('User information is empty');
    }
  }),

  updateById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userUpdates = req.body;

    if (Object.keys(userUpdates).length > 0) {
      const updatedUser = await friendsService.updateById(userUpdates, id);
      if (updatedUser) {
        res.status(201).send(updatedUser);
      } else {
        throw new NotFoundException(`User with Id: ${id} is not found`);
      }
    } else {
      throw new BadRequestException('User information is empty');
    }
  }),

  deleteById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const isDeleted = await friendsService.deleteById(id);

    res
      .status(200)
      .send(
        isDeleted
          ? `User with Id: ${id} is deleted`
          : `User with Id: ${id} is absent`
      );
  }),
};
