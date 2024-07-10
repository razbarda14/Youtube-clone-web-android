import React, { useState, useEffect } from 'react';

function Comments({ video, onCommentAdd, onCommentDelete, onCommentEdit, resetComments, currentUser, comments }) {
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [addCommentText, setAddCommentText] = useState('');

  useEffect(() => {
    if (resetComments) {
      setNewComment('');
      setEditingComment(null);
      setAddCommentText('');
    }
  }, [resetComments]);

  const handleAddInputChange = (event) => {
    setAddCommentText(event.target.value);
  };

  const handleAddComment = () => {
    if (addCommentText.trim() !== '') {
      const comment = {
        userId: currentUser._id, // Ensure currentUser._id is correct
        comment: addCommentText
      };
      onCommentAdd(video._id, comment);
      setAddCommentText('');
    }
  };

  const handleCancelComment = () => {
    setAddCommentText('');
    setEditingComment(null);
  };

  const handleEditInputChange = (event) => {
    setEditingComment({ ...editingComment, comment: event.target.value });
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
  };

  const handleSaveComment = (commentId) => {
    if (editingComment.comment.trim() !== '') {
      onCommentEdit(video._id, commentId, editingComment.comment);
      setEditingComment(null);
    } else {
      alert('Comment cannot be empty.');
    }
  };

  const handleDeleteComment = (commentId) => {
    onCommentDelete(video._id, commentId);
  };

  return (
    <div>
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
        {comments.map((comment) => (
          <div className='container-fluid' key={comment._id}>
            <div className='row'>
              <div className='col-1 align-items-center'>
                <img
                  src={comment.userId?.image || 'default-user.png'}
                  alt="User"
                  className="rounded-circle"
                  width="35px"
                  height="35px"
                />
              </div>
              <div className='col-4'>
                <div className='row'>
                  @{comment.userId?.display_name || 'Unknown'}
                </div>
                <div className='row'>
                  <div className="comment-container">
                    {editingComment && editingComment._id === comment._id ? (
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control"
                          value={editingComment.comment}
                          onChange={handleEditInputChange}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleSaveComment(comment._id)}
                            disabled={editingComment.comment.trim() === ''}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleCancelComment()}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p>{comment.comment}</p>
                        {currentUser && currentUser._id === comment.userId._id && ( // Only show edit/delete if the comment belongs to current user
                          <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={() => handleEditComment(comment)}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-outline-secondary" onClick={() => handleDeleteComment(comment._id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;