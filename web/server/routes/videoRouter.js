const express = require('express');
const videoController = require('../controllers/videoController.js');

const videoRouter = express.Router();

videoRouter.route('/').get(videoController.getAllVideos);
videoRouter.get('/:id', videoController.getVideoById);
videoRouter.put('/:id', videoController.updateVideoById);
videoRouter.delete('/:id', videoController.deleteVideoById);
videoRouter.patch('/increment-views/:id', videoController.incrementViews);

module.exports = videoRouter;