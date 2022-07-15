const asyncHandler = require('../common/asyncHandler');
const universitiesService = require('../services/usersService');

module.exports = {
  getAll: asyncHandler(async (req, res) => {
    const universities = await universitiesService.getAll();

    res.status(200).send(universities);
  }),
};
