import React, { useState, useEffect, useRef } from 'react';
import './CurrentVideo.css';
import ScreenVideo from './ScreenVideo';
import ButtonsVideo from './userOptions/ButtonsVideo';
import Comments from './userOptions/Comments';

function CurrentVideo({ video, onLikeToggle, onDislikeToggle, onCommentAdd, onCommentDelete, onCommentEdit, resetComments, setResetComments, currentUser, onDeleteVideo, onEditVideo, comments }) {
  const videoRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(video?.title || '');
  const [editedDescription, setEditedDescription] = useState(video?.description || '');

  useEffect(() => {
    if (resetComments) {
      setResetComments(false);
    }

    // Pause the video when the component unmounts or when a new video is selected
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [video, resetComments, setResetComments]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEditVideo(video.id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTitle(video.title);
    setEditedDescription(video.description);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDeleteVideo(video.id);
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main-content justify-content-center'>
      <ScreenVideo video={video} videoRef={videoRef} />
      <div className='row'>
        <div className='col-7'>
          <div className="video-header">
            <h4>{video.title}</h4>
            <p>{video.channel}</p>
          </div>
        </div>
        <div className='col-5'>
        <ButtonsVideo video={video} onLikeToggle={onLikeToggle} onDislikeToggle={onDislikeToggle} currentUser={currentUser} />
        </div>
      </div>
      <div className="video-details-box p-3 mb-3">
        {isEditing ? (
          <div>
            <textarea
              className="form-control mb-2"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></textarea>
            <button className="btn btn-primary me-2" onClick={handleSaveClick}>Save</button>
            <button className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
          </div>
        ) : (
          <div>
            <p className="text-bold">Uploaded: {video.dateUploaded} • {video.viewsCount} views</p>
            <p>{video.description}</p>
            {currentUser && (
              <div>
                <button className="btn btn-secondary me-2" onClick={handleEditClick}>Edit Details</button>
                <button className="btn btn-danger" onClick={handleDeleteClick}>Delete Video</button>
              </div>
            )}
          </div>
        )}
      </div>
      <Comments
        video={video}
        onCommentAdd={onCommentAdd}
        onCommentDelete={onCommentDelete}
        onCommentEdit={onCommentEdit}
        resetComments={resetComments}
        currentUser={currentUser}
        comments={comments}
      />
    </div>
  );
}

export default CurrentVideo;
