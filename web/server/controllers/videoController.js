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

module.exports = { getAllVideos };
