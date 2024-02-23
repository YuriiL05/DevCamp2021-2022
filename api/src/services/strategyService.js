import usersService from './usersService.js';
import passport from 'passport';
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import config from '../configs/config.js';

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

export default passport;
