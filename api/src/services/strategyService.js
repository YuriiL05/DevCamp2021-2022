const usersService = require('./usersService');
const passport = require('passport');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('../configs/config');

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
          Phone: '+380111111111',
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

module.exports = passport;
