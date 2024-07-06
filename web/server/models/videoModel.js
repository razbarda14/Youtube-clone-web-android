const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  viewsCount: {
    type: Number,
    required: true
  },
  dateUploaded: {
    type: String,
    required: true
  },
  videoPath: {
    type: String,
    required: true
  },
  thumbnailPath: {
    type: String,
    default: null
  },
  topic: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  comments: {
    type: Array,
    default: []
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  channel: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('VideoModel', VideoSchema);
