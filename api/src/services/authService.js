const usersService = require('./usersService');
const sessionsStorage = require('./storage/sessionsStorage');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../configs/config');

module.exports = {
  authorizeById: async (id) => {
    const user = await usersService.getById(id);
    if (user) {
      const accessToken = jwt.sign(
        {
          UserID: user.UserID,
          FirstName: user.FirstName,
          LastName: user.LastName,
        },
        config.appSecretKey,
        {
          expiresIn: '1h',
        }
      );
      const refreshToken = uuidv4();
      await sessionsStorage.create({
        UserID: user.UserID,
        Token: refreshToken,
      });
      return { accessToken, refreshToken };
    }
    return {};
  },

  refresh: async (refreshToken) => {
    const session = await sessionsStorage.getByToken(refreshToken);
    if (session) {
      const user = await usersService.getById(session.UserID);
      const accessToken = jwt.sign(
        {
          UserID: user.UserID,
          FirstName: user.FirstName,
          LastName: user.LastName,
        },
        config.appSecretKey,
        {
          expiresIn: '1h',
        }
      );
      const refreshToken = uuidv4();
      await sessionsStorage.deleteByToken(session.Token);
      await sessionsStorage.create({
        UserID: session.UserID,
        Token: refreshToken,
      });
      return { accessToken, refreshToken };
    }
    return {};
  },
  logout: async (refreshToken) => {
    await sessionsStorage.deleteByToken(refreshToken);
  },
  getByToken: async (refreshToken) => {
    return await sessionsStorage.getByToken(refreshToken);
  },
};
