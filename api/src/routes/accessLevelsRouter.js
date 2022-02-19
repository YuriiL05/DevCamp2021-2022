const db = require('../configs/db');
const asyncHandler = require('../services/asyncHandler');
const router = require('express').Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const accessLevels = await db('AccessLevels')
      .select('AccessLevelID as value', 'Name as label')
      .timeout(5000);

    res.status(200).send(accessLevels);
  })
);

module.exports = router;
