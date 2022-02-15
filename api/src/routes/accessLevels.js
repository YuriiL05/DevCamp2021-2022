const db = require('../services/db');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const accessLevels = await db('AccessLevels')
      .select('AccessLevelID as value', 'Name as label')
      .timeout(5000);

    res.status(200).send(accessLevels);
  } catch (e) {
    res.status(500);
    next({ error: 'AccessLevels cannot be loaded', e });
  }
});

module.exports = router;
