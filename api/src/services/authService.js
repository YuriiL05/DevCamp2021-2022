const usersService = require('./usersService');
const sessionsStorage = require('./storage/sessionsStorage');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
const FacebookTokenStrategy = require('passport-facebook-token');
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

  googleStrategy: () => {
    passport.use(
      new GoogleTokenStrategy(
        {
          clientID: config.google.authClientId,
          clientSecret: config.google.authClientSecret,
        },
        //  Passport verify callback
        async (accessToken, refreshToken, profile, done) => {
          const [{ value: Email }] = profile.emails;
          const Avatar = profile._json.picture;
          const { familyName: LastName, givenName: FirstName } = profile.name;

          let user = await usersService.getByEmail(Email);
          if (!user) {
            await usersService.create({
              FirstName,
              LastName,
              Email,
              Avatar,
            });
            user = await usersService.getByEmail(Email);
          }

          return done(null, {
            UserID: user.UserID,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
          });
        }
      )
    );
  },

  facebookStrategy: () => {
    passport.use(
      new FacebookTokenStrategy(
        {
          clientID: config.facebook.authClientId,
          clientSecret: config.facebook.authClientSecret,
        },
        //  Passport verify callback
        async (accessToken, refreshToken, profile, done) => {
          const [{ value: Email }] = profile.emails;
          const [{ value: Avatar }] = profile.photos;
          const { familyName: LastName, givenName: FirstName } = profile.name;

          let user = await usersService.getByEmail(Email);
          if (!user) {
            await usersService.create({
              FirstName,
              LastName,
              Email,
              Avatar,
            });
            user = await usersService.getByEmail(Email);
          }

          return done(null, {
            UserID: user.UserID,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
          });
        }
      )
    );
  },
};
