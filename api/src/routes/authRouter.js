import { Router } from 'express';
import passport from 'passport';
import authController from '../controllers/authController.js';

const router = Router();

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

export default router;
