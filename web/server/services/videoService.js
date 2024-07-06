const VideoModel = require('../models/videoModel.js');

const getAllVideos = async () => {
  return await VideoModel.find({});
};

const getVideoById = async (id) => {
  return await VideoModel.findOne({ _id: id });
};

const incrementViews = async (id) => {
  await VideoModel.updateOne({ _id: id }, { $inc: { viewsCount: 1 } });
};

const deleteVideoById = async (id) => {
  return await VideoModel.deleteOne({ _id: id });
};

const updateVideoById = async (id, updatedData) => {
  return await VideoModel.updateOne({ _id: id }, { $set: updatedData });
};

module.exports = { getAllVideos, getVideoById, incrementViews, deleteVideoById, updateVideoById };