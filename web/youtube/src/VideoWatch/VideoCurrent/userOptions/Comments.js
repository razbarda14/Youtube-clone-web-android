import React, { useState, useEffect } from 'react';
import './Comments.css';

function Comments({ video, onCommentAdd, onCommentDelete, onCommentEdit, resetComments, currentUser, comments }) {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState(comments);
  const [editingComment, setEditingComment] = useState(null);
  const [addCommentText, setAddCommentText] = useState('');
  const [showOptions, setShowOptions] = useState(null);

  useEffect(() => {
    setLocalComments(comments);
    if (resetComments) {
      setNewComment('');
      setEditingComment(null);
      setAddCommentText('');
    }
  }, [comments, resetComments]);

  const handleAddInputChange = (event) => {
    setAddCommentText(event.target.value);
  };

  const handleAddComment = () => {
    if (addCommentText.trim() !== '') {
      const comment = {
        text: addCommentText,
        username: currentUser?.userName || 'username',
        userProfilePicture: currentUser?.photo || '/img/default-user.png',
        time: new Date().toLocaleDateString('en-GB'),
      };
      const updatedComments = [...localComments, comment];
      setLocalComments(updatedComments);
      onCommentAdd(video.id, comment);
      setAddCommentText('');
    }
  };

  const handleCancelComment = () => {
    setAddCommentText('');
    setEditingComment(null);
  };

  const handleEditInputChange = (event, index) => {
    if (editingComment && editingComment.index === index) {
      setEditingComment({ ...editingComment, text: event.target.value });
    }
  };

  const handleEditComment = (index, comment) => {
    setEditingComment({ index, text: comment.text });
  };

  const handleSaveComment = (index) => {
    if (editingComment.text.trim() !== '') {
      const updatedComments = localComments.map((comment, i) =>
        i === index ? { ...comment, text: editingComment.text } : comment
      );
      setLocalComments(updatedComments);
      onCommentEdit(video.id, index, editingComment.text);
      setEditingComment(null);
    } else {
      alert('Comment cannot be empty.');
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = localComments.filter((_, i) => i !== index);
    setLocalComments(updatedComments);
    onCommentDelete(video.id, index);
  };

  const toggleOptions = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  return (
    <div>
      <h5>{localComments.length} comments</h5>
      {currentUser && (
        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add a comment..."
            value={addCommentText}
            onChange={handleAddInputChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleAddComment}
              disabled={addCommentText.trim() === ''}
            >
              Send
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleCancelComment}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {!currentUser && (
        <h5>Please sign in to like a video or write a comment</h5>
      )}
      <div className="comments-section mt-3">
        {localComments.map((comment, index) => (
          <div className="comment-container" key={index}>
            <div className="comment-header">
              <img
                src={comment.userProfilePicture || '/img/default-user.png'}
                alt="Profile"
                className="profile-picture"
              />
              <div>
                <span className="username">@{comment.username || 'username'}</span>
                <span className="comment-time">{comment.time}</span>
              </div>
              {currentUser && (
                <div className="options-container">
                  <i className="bi bi-three-dots" onClick={() => toggleOptions(index)}></i>
                  {showOptions === index && (
                    <div className="options-menu">
                      <button onClick={() => handleEditComment(index, comment)}>Edit</button>
                      <button onClick={() => handleDeleteComment(index)}>Delete</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="comment-body">
              {editingComment && editingComment.index === index ? (
                <div className="edit-comment">
                  <input
                    type="text"
                    className="form-control"
                    value={editingComment.text}
                    onChange={(e) => handleEditInputChange(e, index)}
                  />
                  <div className="edit-buttons">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSaveComment(index)}
                      disabled={editingComment.text.trim() === ''}
                    >
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={() => handleCancelComment()}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p>{comment.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
