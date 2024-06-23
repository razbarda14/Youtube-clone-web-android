import React, { useState, useEffect, useRef } from 'react';
import './CurrentVideo.css';
import ScreenVideo from './ScreenVideo';
import ButtonsVideo from './userOptions/ButtonsVideo';
import Comments from './userOptions/Comments';

function CurrentVideo({ video, onLikeToggle, onDislikeToggle, onCommentAdd, onCommentDelete, onCommentEdit, resetComments, setResetComments, currentUser, onDeleteVideo, onEditVideo }) {
  const videoRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(video.title);
  const [editedDescription, setEditedDescription] = useState(video.description);

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

  return (
    <div className='main-content justify-content-center'>
      <ScreenVideo video={video} videoRef={videoRef} />
      <ButtonsVideo video={video} onLikeToggle={onLikeToggle} onDislikeToggle={onDislikeToggle} currentUser={currentUser} />
      {isEditing ? (
        <div>
          <input
            type="text"
            className="form-control mb-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
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
          <h4>{video.title}</h4>
          <p>{video.channel}</p>
          <p>{video.description}</p>
          {currentUser && (
            <div>
              <button className="btn btn-secondary me-2" onClick={handleEditClick}>Edit</button>
              <button className="btn btn-danger" onClick={handleDeleteClick}>Delete</button>
            </div>
          )}
        </div>
      )}
      <Comments
        video={video}
        onCommentAdd={onCommentAdd}
        onCommentDelete={onCommentDelete}
        onCommentEdit={onCommentEdit}
        resetComments={resetComments}
        currentUser={currentUser}
      />
    </div>
  );
}

export default CurrentVideo;
