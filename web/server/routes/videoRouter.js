// routes/videoRouter.js
const express = require('express');
const videoController = require('../controllers/videoController.js');
const upload = require('../middleware/multerConfig');

const videoRouter = express.Router();

videoRouter.route('/')
    .get(videoController.getAllVideos)
    .post(upload.fields([
        { name: 'videoFile', maxCount: 1 },
        { name: 'thumbnailFile', maxCount: 1 }
    ]), videoController.createVideo);

videoRouter.get('/:id', videoController.getVideoById);
videoRouter.put('/:id', videoController.updateVideoById);
videoRouter.delete('/:id', videoController.deleteVideoById);
videoRouter.patch('/increment-views/:id', videoController.incrementViews);

module.exports = videoRouter;
