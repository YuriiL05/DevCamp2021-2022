const universitiesController = require('../controllers/universitiesController');
const router = require('express').Router();

router.get('/', universitiesController.getAll);

module.exports = router;
