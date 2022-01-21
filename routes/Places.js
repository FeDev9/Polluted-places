const express = require('express');
const router = express.Router();
const controller = require('../controllers/placesController');

router.post('/upload', controller.upload);
router.get('/delete/:id', controller.delete);

module.exports = router;