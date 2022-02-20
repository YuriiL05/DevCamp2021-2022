const usersService = require('./usersService');
const sessionsStorage = require('./storage/sessionsStorage');
const config = require('../configs/config');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
const { authClientId, authClientSecret } = require('../configs/config');

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
        config.appSecretKey
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
        config.appSecretKey
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
          clientID: authClientId,
          clientSecret: authClientSecret,
        },
        //  Passport verify callback
        async (accessToken, refreshToken, profile, done) => {
          const [{ value: Email }] = profile.emails;
          const { familyName: LastName, givenName: FirstName } = profile.name;

          let user = await usersService.getByEmail(Email);
          if (!user) {
            await usersService.create({
              FirstName,
              LastName,
              Email,
              Avatar: profile._json.picture,
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
