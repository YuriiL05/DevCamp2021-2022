const db = require('../services/db');
const asyncHandler = require('../middlewares/asyncHandler');
const customError = require('../middlewares/customError');
const router = require('express').Router();

router.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const friendType = 1; // RelationTypes table
    const userId = +req.params.userId;

    const friends = await db('UserFriends')
      .select()
      .from(function () {
        this.select('ReceiverID as FriendID')
          .from('UserRelations')
          .where({ UserID: userId, RelationTypeID: friendType })
          .union(function () {
            this.select('UserID as FriendID')
              .from('UserRelations')
              .where({ ReceiverID: userId, RelationTypeID: friendType });
          })
          .as('UserFriends');
      })
      .join('Users', 'UserFriends.FriendID', '=', 'Users.UserID')
      .timeout(5000);

    if (friends.length === 0) {
      throw new customError('Friends are absent', 404);
    }

    res.status(200).send(friends);
  })
);

module.exports = router;
