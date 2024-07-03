const videoService = require('../services/video');

const getAllVideos = async (req, res) => {
  res.json(await videoService.getAllVideos());
};

module.exports = { getAllVideos };
