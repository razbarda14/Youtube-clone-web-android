const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  uploaderId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('VideoModel', VideoSchema);
