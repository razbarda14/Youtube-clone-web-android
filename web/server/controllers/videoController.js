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

module.exports = { getAllVideos, getVideoById, incrementViews, deleteVideoById, updateVideoById };