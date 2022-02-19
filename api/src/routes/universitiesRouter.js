const db = require('../configs/db');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const universities = await db('Universities')
      .select('UniversityID as UnId', 'Name as UniversityName')
      .orderBy('UniversityID', 'asc')
      .timeout(5000);

    res.status(200).send(universities);
  } catch (e) {
    res.status(500);
    next({ error: 'Universities cannot be loaded', e });
  }
});

module.exports = router;
