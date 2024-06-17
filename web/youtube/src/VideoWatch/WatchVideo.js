import React, { useState } from 'react';
import Toolbar from './Toolbar';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './VideoCurrent/CurrentVideo';
import './WatchVideos.css';
import videoData from '../videodata.json';

function WatchVideo() {
  const [videos, setVideos] = useState(videoData);
  const [selectedVideoId, setSelectedVideoId] = useState(videoData[0].id);
  const [resetComments, setResetComments] = useState(false);

  const handleVideoSelect = (video) => {
    setSelectedVideoId(video.id);
    setResetComments(true);

    // Increment the view count for the selected video
    setVideos(prevVideos =>
      prevVideos.map(v =>
        v.id === video.id ? { ...v, views: v.views + 1 } : v
      )
    );
  };

  const handleLikeToggle = (videoId) => {
    setVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.id === videoId) {
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
            likes: video.isLiked ? video.likes - 1 : video.likes // Update likes if previously liked
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
                video={videos.find(video => video.id === selectedVideoId)}
                onLikeToggle={handleLikeToggle}
                onDislikeToggle={handleDislikeToggle}
                onCommentAdd={handleCommentAdd}
                onCommentDelete={handleCommentDelete}
                onCommentEdit={handleCommentEdit}
                resetComments={resetComments}
                setResetComments={setResetComments}
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
