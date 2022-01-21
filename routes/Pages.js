const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagesController');


router.get('/', controller.home);
router.get('/upload', controller.upload);

module.exports = router;