const router = require('express').Router();
const friendsController = require('../controllers/friendsController');

router.get('/:id', friendsController.getFriends);

module.exports = router;
