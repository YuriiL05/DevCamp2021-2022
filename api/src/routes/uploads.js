const db = require('../services/db');
const router = require('express').Router();
const multer = require('../middlewares/multerToS3');

//Upload Avatar
router.post('/avatars/:id', multer.single('avatar'), async (req, res, next) => {
  const newAvatar = req.file;
  const { id } = req.params;

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
      res.status(500);
      next({
        error: `File is uploaded to ${avatarPath} but avatar path cannot be updated in DB`,
        e,
      });
    }
  } else {
    res.status(500);
    next('Error during avatar upload');
  }
});

router.post('/articles/:id', multer.single('file'), async (req, res, next) => {
  const newFile = req.file;
  const { id } = req.params;

  if (newFile) {
    const filePath = newFile.location;

    try {
      const isUpdated = await db('Articles')
        .where({ ArticleID: id })
        .update({ File: filePath });

      res.send(
        isUpdated
          ? `File is uploaded to ${filePath}`
          : `File is uploaded to ${filePath} but article is not found in DB`
      );
    } catch (e) {
      res.status(500);
      next({
        error: `File is uploaded to ${filePath} but avatar path cannot be updated in DB`,
        e,
      });
    }
  } else {
    res.status(500);
    next('Error during avatar upload');
  }
});

module.exports = router;
