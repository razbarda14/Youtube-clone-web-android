const videoService = require('../services/videoService.js');

const getAllVideos = async (_, res) => {
  try {
    const videosList = await videoService.getAllVideos();
    res.json(videosList);
    console.log("Tomer says: video list fetched successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const incrementViews = async (req, res) => {
  try {
    await videoService.incrementViews(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteVideoById = async (req, res) => {
  try {
    const result = await videoService.deleteVideoById(req.params.id);
    if (result.deletedCount > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateVideoById = async (req, res) => {
  try {
    const updatedData = req.body;
    const result = await videoService.updateVideoById(req.params.id, updatedData);
    if (result.nModified > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: 'Video not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createVideo = async (req, res) => {
  try {
    const { title, description, topic, channel } = req.body; // Extract channel from req.body
    const videoFile = req.files.videoFile[0];
    const thumbnailFile = req.files.thumbnailFile ? req.files.thumbnailFile[0] : null;

    const newVideo = {
      id: Date.now(), // Adding id here
      title,
      description,
      topic,
      channel,
      videoPath: `/uploads/videos/${videoFile.filename}`,
      thumbnailPath: thumbnailFile ? `/uploads/thumbnails/${thumbnailFile.filename}` : null,
      viewsCount: 0,
      dateUploaded: new Date().toLocaleDateString('en-GB'),
      isLiked: false,
      likes: 0,
      comments: []
    };

    const savedVideo = await videoService.createVideo(newVideo);
    res.status(201).json(savedVideo);
  } catch (err) {
    console.error('Error creating video:', err.message); // Log the error
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllVideos, getVideoById, incrementViews, deleteVideoById, updateVideoById, createVideo };