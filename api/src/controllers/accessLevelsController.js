import asyncHandler from '../common/asyncHandler.js';
import accessLevelsService from '../services/accessLevelsService.js';

export default {
  getAll: asyncHandler(async (req, res) => {
    const comments = await accessLevelsService.getAll();

    res.status(200).send(comments);
  }),
};
