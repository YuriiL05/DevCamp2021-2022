import usersService from './usersService.js';
import sessionsStorage from './storage/sessionsStorage.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import config from '../configs/config.js';

export default {
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
          expiresIn: config.jwtTokenExpiration || '30m',
        },
        null
      );
      const refreshToken = uuidv4(null, null, null);
      const numberOfSessions = await sessionsStorage.getCountForUser(
        user.UserID
      );

      if (numberOfSessions.count >= 3) {
        await sessionsStorage.deleteAllForUser(user.UserID);
      }
      await sessionsStorage.create({
        UserID: user.UserID,
        Token: refreshToken,
        Date: new Date().toISOString(),
      });
      return {
        accessToken,
        refreshToken,
        UserID: user.UserID,
        FullName: `${user.FirstName} ${user.LastName}`,
        Avatar: user.Avatar,
      };
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
          expiresIn: config.jwtTokenExpiration || '30m',
        },
        null
      );
      const refreshToken = uuidv4(null, null, null);
      await sessionsStorage.deleteByToken(session.Token);
      await sessionsStorage.create({
        UserID: session.UserID,
        Token: refreshToken,
        Date: new Date().toISOString(),
      });
      return { accessToken, refreshToken };
    }
    return {};
  },
  logout: async (refreshToken) => {
    await sessionsStorage.deleteByToken(refreshToken);
  },
};
