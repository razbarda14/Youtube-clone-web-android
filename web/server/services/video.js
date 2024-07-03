const VideoModel = require('../models/video');

const getAllVideos = async () => {
  return await VideoModel.find({});
};

module.exports = { getAllVideos };
