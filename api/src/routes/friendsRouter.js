import { Router } from 'express';
import friendsController from '../controllers/friendsController.js';

const router = Router();

router.get('/:id', friendsController.getFriends);
router.get('/:id/requests', friendsController.getRequestsToFriends);
router.post('/:id', friendsController.addRequestToFriend);
router.put('/:id', friendsController.updateToFriend);
router.delete('/:requestId', friendsController.removeFriend);

export default router;
