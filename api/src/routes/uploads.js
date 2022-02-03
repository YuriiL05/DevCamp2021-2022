const db = require('../services/db');
const router = require('express').Router();
const multer = require('../middlewares/multerToS3');

//Upload Avatar
router.post('/:id', multer.single('avatar'), async (req, res) => {
  const newAvatar = req.file;
  const { id } = req.params;

  console.log(newAvatar);

  if (newAvatar) {
    const avatarPath = newAvatar.location;

    try {
      const isUpdated = await db('Users')
        .where({ UserID: id })
        .update({ Avatar: avatarPath });

      res.send(
        isUpdated
          ? `File is uploaded to ${avatarPath}`
          : `File is uploaded to ${avatarPath} but user is not found in DB`
      );
    } catch (e) {
      res.status(500).send({
        error: `File is uploaded to ${avatarPath} but avatar path cannot be updated in DB`,
        e,
      });
    }
  } else {
    res.status(500).send('Error during avatar upload');
  }
});

module.exports = router;
