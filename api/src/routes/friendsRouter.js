const router = require('express').Router();
const friendsController = require('../controllers/friendsController');

router.get('/:id', friendsController.getFriends);
router.get('/:id/requests', friendsController.getRequestsToFriends);
router.post('/:id', friendsController.addRequestToFriend);
router.put('/:id', friendsController.updateToFriend);
router.delete('/:requestId', friendsController.removeFriend);

module.exports = router;
