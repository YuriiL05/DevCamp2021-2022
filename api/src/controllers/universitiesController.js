import asyncHandler from '../common/asyncHandler.js';
import universitiesService from '../services/universitiesService.js';

export default {
  getAll: asyncHandler(async (req, res) => {
    const universities = await universitiesService.getAll();

    res.status(200).send(universities);
  }),
};
