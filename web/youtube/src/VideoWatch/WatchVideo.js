import React, { useState } from 'react';
import Toolbar from './Toolbar';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './VideoCurrent/CurrentVideo';
import './WatchVideos.css';
import videoData from '../videodata.json';

function WatchVideo() {
  const [videos, setVideos] = useState(videoData);
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };
  
  const handleLikeToggle = (videoId) => {
    setVideos(videos.map(video => {
      if (video.id === videoId) {
        video.isLiked = !video.isLiked;
        video.likes += video.isLiked ? 1 : -1;
      }
      return video;
    }));
    setSelectedVideo(videos.find(video => video.id === videoId));
  };
  
  const handleCommentAdd = (videoId, comment) => {
    setVideos(videos.map(video => {
      if (video.id === videoId) {
        video.comments = video.comments || [];
        video.comments.push(comment);
      }
      return video;
    }));
    setSelectedVideo(videos.find(video => video.id === videoId));
  };

  return (
    <div>
      <Toolbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <div className="current-video-padding">
              <CurrentVideo
                video={selectedVideo}
                onLikeToggle={handleLikeToggle}
                onCommentAdd={handleCommentAdd}
              />
            </div>
          </div>
          <div className="col-md-4">
            <SuggestedVideos onVideoSelect={handleVideoSelect} videoData={videos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchVideo;