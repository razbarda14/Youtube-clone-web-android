const express = require('express');
const videoController = require('../controllers/videoController.js');

const videoRouter = express.Router();

videoRouter.route('/').get(videoController.getAllVideos);

module.exports = videoRouter;
