const asyncHandler = require('../common/asyncHandler');
const usersService = require('../services/usersService');
const NotFoundException = require('../errors/NotFoundException');
const BadRequestException = require('../errors/BadRequestException');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const users = await usersService.getAll();

    if (users.length === 0) {
      throw new NotFoundException('Users not found');
    } else {
      res.status(200).send(users);
    }
  }),

  getById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await usersService.getById(id);

    if (user) {
      res.status(200).send(user);
    } else {
      throw new NotFoundException(`User with Id: ${id} is not found`);
    }
  }),

  create: asyncHandler(async (req, res) => {
    const newUserData = req.body;

    if (Object.keys(newUserData).length > 0) {
      const newUserId = await usersService.create(newUserData);
      res.status(201).send({ id: newUserId });
    } else {
      throw new BadRequestException('User information is empty');
    }
  }),

  updateById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userUpdates = req.body;

    if (Object.keys(userUpdates).length > 0) {
      const updatedUser = await usersService.updateById(userUpdates, id);
      if (updatedUser) {
        res.status(201).send(updatedUser);
      } else {
        throw new NotFoundException(`User with Id: ${id} is not found`);
      }
    } else {
      throw new BadRequestException('User information is empty');
    }
  }),

  updateAvatar: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const newAvatarPath = req?.file?.location || null;
    const userUpdates = { Avatar: newAvatarPath };

    const updatedUser = await usersService.updateById(userUpdates, id);
    if (updatedUser) {
      res.status(201).send(updatedUser);
    } else {
      throw new NotFoundException(`User with Id: ${id} is not found`);
    }
  }),

  deleteById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const isDeleted = await usersService.deleteById(id);

    res
      .status(200)
      .send(
        isDeleted
          ? `User with Id: ${id} is deleted`
          : `User with Id: ${id} is absent`
      );
  }),
};
