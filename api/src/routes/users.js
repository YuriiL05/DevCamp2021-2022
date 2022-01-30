const router = require('express').Router();
const db = require('../services/db');
const path = require('path');

router.get('/', async (req, res) => {
  try {
    const users = await db.select().from('Users').timeout(10000);

    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({ error: 'Users cannot be loaded', e });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (Number.isInteger(+id)) {
    try {
      const user = await db('Users').where({ UserID: id });
      if (user.length > 0) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ error: `User with Id: ${id} is not found` });
      }
    } catch (e) {
      res.status(500).send({ error: 'User cannot be loaded', e });
    }
  } else {
    res.status(400).send({ error: 'User Id is not correct' });
  }
});

//Get Avatar
router.get('/:id/avatar', async (req, res) => {
  const id = req.params.id;
  const uploadsPath = __dirname.split('/src').shift();

  if (Number.isInteger(+id)) {
    try {
      const user = await db('Users').where({ UserID: id });

      if (user.length > 0) {
        res.sendFile(path.join(uploadsPath, user[0].Avatar));
      } else {
        res.status(404).send({ error: `User with Id: ${id} is not found` });
      }
    } catch (e) {
      res.status(500).send({ error: 'User cannot be loaded', e });
    }
  } else {
    res.status(400).send({ error: 'User Id is not correct' });
  }
});

router.post('/', async (req, res) => {
  const newUserData = req.body;

  if (Object.keys(newUserData).length > 0) {
    try {
      await db('Users').insert(newUserData);

      res.status(200).send('New user was added');
    } catch (e) {
      res.status(500).send({ error: 'User cannot be added', e });
    }
  } else {
    res.status(400).send({ error: 'User information is empty' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const userUpdates = req.body;

  if (Number.isInteger(+id)) {
    try {
      const user = await db('Users').where({ UserID: id });
      if (user.length > 0) {
        const updatedInfoUser = { ...user[0], ...userUpdates };

        await db('Users').where({ UserID: id }).update(updatedInfoUser);
        res.status(200).send(updatedInfoUser);
      } else {
        res.status(404).send({ error: `User with Id: ${id} is not found` });
      }
    } catch (e) {
      res.status(500).send({ error: 'User cannot be loaded', e });
    }
  } else {
    res.status(400).send({ error: 'User Id is not correct' });
  }
});

router.delete('/:id', async (req, res) => {
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
      res.status(500).send({ error: 'User cannot be deleted', e });
    }
  } else {
    res.status(400).send({ error: 'User Id is not correct' });
  }
});

module.exports = router;
