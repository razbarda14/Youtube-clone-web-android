import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './WatchVideos.css';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './VideoCurrent/CurrentVideo';

function WatchVideo({ videoList, currentUser, onDeleteVideo, onEditVideo }) {
  const { videoId } = useParams();
  const [videos, setVideos] = useState(videoList);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [resetComments, setResetComments] = useState(false);
  const [incrementedVideoId, setIncrementedVideoId] = useState(null);

  useEffect(() => {
    const id = videoId ? parseInt(videoId) : videoList[0].id;
    setSelectedVideoId(id);
    setResetComments(true);

    if (incrementedVideoId !== id) {
      setVideos(prevVideos =>
        prevVideos.map(v =>
          v.id === id ? { ...v, viewsCount: parseInt(v.viewsCount) + 1 } : v
        )
      );
      setIncrementedVideoId(id);
    }
  }, [videoId, incrementedVideoId, videoList]);

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
                onDeleteVideo={onDeleteVideo}
                onEditVideo={onEditVideo}
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
