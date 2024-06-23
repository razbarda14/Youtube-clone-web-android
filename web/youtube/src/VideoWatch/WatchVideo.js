import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './WatchVideos.css';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './VideoCurrent/CurrentVideo';
import videoData from '../videosLibrary/VideosLibrary.json';

function WatchVideo({ comments, addComment, editComment, deleteComment, currentUser, videoList }) {
  const { videoId } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [resetComments, setResetComments] = useState(false);
  const [incrementedVideoId, setIncrementedVideoId] = useState(null);

  useEffect(() => {
    const id = videoId ? parseInt(videoId) : videoData[0].id;
    const video = videoList.find(v => v.id === id);
    setSelectedVideo(video);
    setResetComments(true);

    if (incrementedVideoId !== id) {
      videoList = videoList.map(v =>
        v.id === id ? { ...v, viewsCount: (parseInt(v.viewsCount) + 1).toString() } : v
      );
      setIncrementedVideoId(id);
    }
  }, [videoId, incrementedVideoId, videoList]);

  useEffect(() => {
    if (selectedVideo) {
      window.scrollTo(0, 0); // Scroll to top when selectedVideo changes
    }
  }, [selectedVideo]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setResetComments(true);
  };

  const handleLikeToggle = (videoId) => {
    videoList = videoList.map(video => {
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
    });
  };

  const handleDislikeToggle = (videoId) => {
    videoList = videoList.map(video => {
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
    });
  };

  const handleCommentAdd = (videoId, comment) => {
    addComment(videoId, comment);
  };

  const handleCommentDelete = (videoId, commentIndex) => {
    deleteComment(videoId, commentIndex);
  };

  const handleCommentEdit = (videoId, commentIndex, newComment) => {
    editComment(videoId, commentIndex, newComment);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <div className="current-video-padding">
            {selectedVideo && (
              <CurrentVideo
                video={selectedVideo}
                onLikeToggle={handleLikeToggle}
                onDislikeToggle={handleDislikeToggle}
                onCommentAdd={handleCommentAdd}
                onCommentDelete={handleCommentDelete}
                onCommentEdit={handleCommentEdit}
                resetComments={resetComments}
                setResetComments={setResetComments}
                currentUser={currentUser}
                comments={comments[selectedVideo.id] || []}
              />
            )}
          </div>
        </div>
        <div className="col-4">
          <SuggestedVideos onVideoSelect={handleVideoSelect} videoData={videoList} />
        </div>
      </div>
    </div>
  );
}

export default WatchVideo;
