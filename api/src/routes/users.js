const router = require('express').Router();
const db = require('../services/db');
const path = require('path');
const asyncHandler = require('../middlewares/asyncHandler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await db.select().from('Users').timeout(5000);

    res.status(200).send(users);
  })
);

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  if (Number.isInteger(+id)) {
    try {
      const user = await db('Users')
        .join(
          'Universities',
          'Users.UniversityID',
          '=',
          'Universities.UniversityID'
        )
        .first()
        .where({ UserID: id });
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404);
        next({ error: `User with Id: ${id} is not found` });
      }
    } catch (e) {
      res.status(500);
      next({ error: 'User cannot be loaded', e });
    }
  } else {
    res.status(400);
    next({ error: 'User Id is not correct' });
  }
});

//Get Avatar from file system
router.get('/:id/avatar', async (req, res, next) => {
  const id = req.params.id;
  const uploadsPath = __dirname.split('/src').shift();

  if (Number.isInteger(+id)) {
    try {
      const user = await db('Users').first().where({ UserID: id });

      if (user) {
        res.sendFile(path.join(uploadsPath, user.Avatar));
      } else {
        res.status(404);
        next({ error: `User with Id: ${id} is not found` });
      }
    } catch (e) {
      res.status(500);
      next({ error: 'User cannot be loaded', e });
    }
  } else {
    res.status(400);
    next({ error: 'User Id is not correct' });
  }
});

router.post('/', async (req, res, next) => {
  const newUserData = req.body;

  if (Object.keys(newUserData).length > 0) {
    try {
      await db('Users').insert(newUserData);

      res.status(200).send('New user was added');
    } catch (e) {
      res.status(500);
      next({ error: 'User cannot be added', e });
    }
  } else {
    res.status(400);
    next({ error: 'User information is empty' });
  }
});

router.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const userUpdates = req.body;

  if (Number.isInteger(+id)) {
    try {
      const user = await db('Users').first().where({ UserID: id });
      if (user) {
        const updatedInfoUser = { ...user, ...userUpdates };

        await db('Users').where({ UserID: id }).update(updatedInfoUser);
        res.status(200).send(updatedInfoUser);
      } else {
        res.status(404);
        next({ error: `User with Id: ${id} is not found` });
      }
    } catch (e) {
      res.status(500);
      next({ error: 'User cannot be loaded', e });
    }
  } else {
    res.status(400);
    next({ error: 'User Id is not correct' });
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  if (Number.isInteger(+id)) {
    try {
      const isDeleted = await db('Users').where({ UserID: id }).delete();

      res.send(
        isDeleted
          ? `User with Id: ${id} is deleted`
          : `User with Id: ${id} is absent`
      );
    } catch (e) {
      res.status(500);
      next({ error: 'User cannot be deleted', e });
    }
  } else {
    res.status(400);
    next({ error: 'User Id is not correct' });
  }
});

module.exports = router;
