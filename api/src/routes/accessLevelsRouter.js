const accessLevelsController = require('../controllers/accessLevelsController');
const router = require('express').Router();

router.get('/', accessLevelsController.getAll);

module.exports = router;
