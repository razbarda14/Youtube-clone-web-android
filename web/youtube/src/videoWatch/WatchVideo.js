import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './VideoCurrent/CurrentVideo';

function WatchVideo({ comments, addComment, editComment, deleteComment, currentUser, videoList, deleteVideo, editVideo, setVideoList }) {
  const { videoId } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [resetComments, setResetComments] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndIncrementVideoById = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/api/videos/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Increment the view count in the database
        await fetch(`http://localhost:8080/api/videos/increment-views/${id}`, {
          method: 'PATCH',
        });

        // Update the local state with the incremented view count
        setSelectedVideo({ ...data, viewsCount: (parseInt(data.viewsCount) + 1).toString() });
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchAndIncrementVideoById(videoId);
  }, [videoId]);

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
    setVideoList(prevVideoList =>
        prevVideoList.map(video => {
          if (video._id === videoId) {
            return {
              ...video,
              isLiked: !video.isLiked,
              likes: video.isLiked ? video.likes - 1 : video.likes + 1,
              isDisliked: false,
            };
          } else {
            return video;
          }
        })
    );
  };

  const handleDislikeToggle = (videoId) => {
    setVideoList(prevVideoList =>
        prevVideoList.map(video => {
          if (video._id === videoId) {
            return {
              ...video,
              isDisliked: !video.isDisliked,
              isLiked: false,
              likes: video.isLiked ? video.likes - 1 : video.likes, // Update likes if previously liked
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

  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${videoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        deleteVideo(videoId);
        navigate('/');
      } else {
        console.error('Failed to delete video:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleEditVideo = async (videoId, newTitle, newDescription, newTopic) => {
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${videoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, description: newDescription, topic: newTopic }),
      });

      if (response.ok) {
        editVideo(videoId, newTitle, newDescription, newTopic);
        setSelectedVideo(prevVideo => ({ ...prevVideo, title: newTitle, description: newDescription, topic: newTopic }));
      } else {
        console.error('Failed to edit video:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing video:', error);
    }
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
                      comments={comments[selectedVideo._id] || []}
                      onDeleteVideo={handleDeleteVideo} // Pass the handleDeleteVideo function
                      onEditVideo={handleEditVideo} // Pass the handleEditVideo function
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
