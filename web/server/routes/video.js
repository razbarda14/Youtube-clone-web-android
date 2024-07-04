const express = require('express');
const videoController = require('../controllers/video');

const router = express.Router();

router.route('/').get(videoController.getAllVideos);


module.exports = router;
