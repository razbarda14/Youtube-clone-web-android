const videoService = require('../services/video');

const getAllVideos = async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAllVideos };
