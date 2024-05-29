import React from 'react';

const currentVideoData = {
  id: 1,
  title: 'Current Video Title',
  description: 'This is the description of the current video.',
  channel: 'Channel Name',
  views: '1M views',
  uploadDate: '1 sec ago',
  videoUrl: '/path/to/video.mp4', // This would be a URL to the video file or video platform
  thumbnail: '/path/to/thumbnail.jpg' // Used as a placeholder before the video plays
};

function CurrentVideo() {
  return (
    <div className="current-video">
      <div className="embed-responsive embed-responsive-16by9 mb-3">
        <video className="embed-responsive-item" controls poster={currentVideoData.thumbnail}>
          <source src={currentVideoData.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h3>{currentVideoData.title}</h3>
      <p>{currentVideoData.description}</p>
      <div className="d-flex justify-content-between">
        <span>{currentVideoData.channel}</span>
        <span>{currentVideoData.views} • {currentVideoData.uploadDate}</span>
      </div>
    </div>
  );
}

export default CurrentVideo;
