const asyncHandler = require('../common/asyncHandler');
const accessLevelsService = require('../services/accessLevelsService');

module.exports = {
  getAll: asyncHandler(async (req, res) => {
    const comments = await accessLevelsService.getAll();

    res.status(200).send(comments);
  }),
};
