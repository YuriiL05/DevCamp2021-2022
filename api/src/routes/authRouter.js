const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.post(
  '/google',
  passport.authenticate('google-token', { session: false }, null),
  authController.auth
);
router.post(
  '/facebook',
  passport.authenticate('facebook-token', { session: false }, null),
  authController.auth
);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;
