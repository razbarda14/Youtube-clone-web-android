import Toolbar from './Toolbar';
import React, { useState } from 'react';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './VideoCurrent/CurrentVideo';
import './WatchVideos.css';
import videoData from '../videodata.json';

function WatchVideo() {
  const [videos, setVideos] = useState(videoData); // Use videoData for state
  const [selectedVideoId, setSelectedVideoId] = useState(videoData[0].id); // Store selected video ID

  const handleVideoSelect = (video) => {
    setSelectedVideoId(video.id);
  };

  const handleLikeToggle = (videoId) => {
    setVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.id === videoId) {
          // Toggle isLiked, update likes, and reset isDisliked
          return {
            ...video,
            isLiked: !video.isLiked,
            likes: video.isLiked ? video.likes - 1 : video.likes + 1,
            isDisliked: false
          };
        } else {
          return video;
        }
      })
    );
  };

  const handleDislikeToggle = (videoId) => {
    setVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.id === videoId) {
          return {
            ...video,
            isDisliked: !video.isDisliked,
            isLiked: false,
            likes: video.isLiked ? video.likes - 1 : video.likes  // Update likes if previously liked
          };
        } else {
          return video;
        }
      })
    );
  };
  const handleCommentAdd = (videoId, comment) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId 
          ? { ...video, comments: [...(video.comments || []), comment] }
          : video
      )
    );
  };

  const handleCommentDelete = (videoId, commentIndex) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? { ...video, comments: video.comments.filter((_, i) => i !== commentIndex) }
          : video
      )
    );
  };

  const handleCommentEdit = (videoId, commentIndex, newComment) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? { ...video, comments: video.comments.map((c, i) => i === commentIndex ? newComment : c) }
          : video
      )
    );
  };
  return (
    <div>
      <Toolbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <div className="current-video-padding">
              <CurrentVideo
                video={videos.find(video => video.id === selectedVideoId)} // Find video by ID
                onLikeToggle={handleLikeToggle}
                onDislikeToggle={handleDislikeToggle}
                onCommentAdd={handleCommentAdd}
                onCommentDelete={handleCommentDelete}
                onCommentEdit={handleCommentEdit}
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
