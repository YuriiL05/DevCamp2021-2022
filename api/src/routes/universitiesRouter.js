const universitiesController = require('../services/usersService');
const authMiddleware = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.use(authMiddleware);
router.get('/', universitiesController.getAll);

module.exports = router;
