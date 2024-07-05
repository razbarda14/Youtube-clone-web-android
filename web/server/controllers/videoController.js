const videoService = require('../services/videoService.js');

const getAllVideos = async (_, res) => {
  try {
    const videosList = await videoService.getAllVideos();
    res.json(videosList);
    console.log(videosList);
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

module.exports = { getAllVideos, getVideoById, incrementViews };