// routes/videoRouter.js
const express = require('express');
const videoController = require('../controllers/videoController.js');
const upload = require('../middleware/multerConfig');
const authenticateToken = require('../middleware/authMiddleware'); // Correct import
const videoRouter = express.Router();

videoRouter.route('/')
    .get(videoController.getMostViewedAndRandomVideos)
    .post(upload.fields([
        { name: 'videoFile', maxCount: 1 },
        { name: 'thumbnailFile', maxCount: 1 }
    ]), videoController.createVideo);

videoRouter.get('/:id', videoController.getVideoById);

videoRouter.delete('/:id', (req, res) => {
    const userId = req.body.userId;
    videoController.deleteVideoById({ ...req, body: { ...req.body, userId } }, res);
  });

  videoRouter.put('/:id', (req, res) => {
    const userId = req.body.userId;
    videoController.updateVideoById({ ...req, body: { ...req.body, userId } }, res);
  });

// Video information
videoRouter.get('/:id/uploader', videoController.getVideoWithUploaderNameById);
videoRouter.patch('/increment-views/:id', videoController.incrementViews);

// Handle comments
videoRouter.post('/:id/comments', videoController.addCommentToVideo);
videoRouter.delete('/:id/comments/:commentId', videoController.deleteCommentFromVideo); 
videoRouter.put('/:id/comments/:commentId', videoController.editCommentInVideo); 

module.exports = videoRouter;