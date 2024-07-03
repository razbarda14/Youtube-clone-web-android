const videoController = require('../controllers/video');

const express = require('express');
var router = express.Router();

router.route('/').get(videoController.getAllVideos);

module.exports = router;
