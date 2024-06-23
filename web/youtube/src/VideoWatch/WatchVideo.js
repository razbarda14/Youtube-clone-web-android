import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './WatchVideos.css';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './VideoCurrent/CurrentVideo';
import videoData from '../videosLibrary/VideosLibrary.json';

function WatchVideo({ comments, addComment, editComment, deleteComment, currentUser }) {
  const { videoId } = useParams();
  const [videos, setVideos] = useState(videoData);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [resetComments, setResetComments] = useState(false);
  const [incrementedVideoId, setIncrementedVideoId] = useState(null);

  useEffect(() => {
    const id = videoId ? parseInt(videoId) : videoData[0].id;
    setSelectedVideoId(id);
    setResetComments(true);

    if (incrementedVideoId !== id) {
      setVideos(prevVideos =>
        prevVideos.map(v =>
          v.id === id ? { ...v, views: v.views + 1 } : v
        )
      );
      setIncrementedVideoId(id);
    }
  }, [videoId, incrementedVideoId]);

  useEffect(() => {
    if (selectedVideoId) {
      window.scrollTo(0, 0); // Scroll to top when selectedVideoId changes
    }
  }, [selectedVideoId]);

  const handleVideoSelect = (video) => {
    setSelectedVideoId(video.id);
    setResetComments(true);
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
            {selectedVideoId && (
              <CurrentVideo
                video={videos.find(video => video.id === selectedVideoId)}
                onLikeToggle={handleLikeToggle}
                onDislikeToggle={handleDislikeToggle}
                onCommentAdd={handleCommentAdd}
                onCommentDelete={handleCommentDelete}
                onCommentEdit={handleCommentEdit}
                resetComments={resetComments}
                setResetComments={setResetComments}
                currentUser={currentUser}
                comments={comments[selectedVideoId] || []}
              />
            )}
          </div>
        </div>
        <div className="col-4">
          <SuggestedVideos onVideoSelect={handleVideoSelect} videoData={videos} />
        </div>
      </div>
    </div>
  );
}

export default WatchVideo;
