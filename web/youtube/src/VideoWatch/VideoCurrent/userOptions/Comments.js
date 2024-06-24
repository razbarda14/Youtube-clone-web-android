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
        text: addCommentText,
        user: {
          displayName: currentUser.displayName,
          photo: currentUser.photo || 'default-user.png'
        },
        date: new Date().toLocaleDateString('en-GB')
      };
      onCommentAdd(video.id, comment);
      setAddCommentText('');
    }
  };

  const handleCancelComment = () => {
    setAddCommentText('');
    setEditingComment(null);
  };

  const handleEditInputChange = (event) => {
    setEditingComment({ ...editingComment, text: event.target.value });
  };

  const handleEditComment = (index, comment) => {
    setEditingComment({ index, ...comment });
  };

  const handleSaveComment = (index) => {
    if (editingComment.text.trim() !== '') {
      const updatedComment = {
        ...editingComment,
        user: {
          displayName: editingComment.user.displayName,
          photo: editingComment.user.photo || 'default-user.png'
        },
        text: editingComment.text
      };
      onCommentEdit(video.id, index, updatedComment);
      setEditingComment(null);
    } else {
      alert('Comment cannot be empty.');
    }
  };

  const handleDeleteComment = (index) => {
    onCommentDelete(video.id, index);
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
        {comments.map((comment, index) => (
          <div className='container-fluid' key={index}>
            <div className='row'>
              <div className='col-1 align-items-center'>
                <img
                  src={comment.user?.photo || 'default-user.png'}
                  alt="User"
                  className="rounded-circle"
                  width="40"
                />
              </div>
              <div className='col-4'>
                <div className='row'>
                  @{comment.user?.displayName || 'Unknown'}
                </div>
                <div className='row'>
                  <div className="comment-container">
                    {editingComment && editingComment.index === index ? (
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control"
                          value={editingComment.text}
                          onChange={handleEditInputChange}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleSaveComment(index)}
                            disabled={editingComment.text.trim() === ''}
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
                        <p>{comment.text}</p>
                        {currentUser && (
                          <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={() => handleEditComment(index, comment)}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-outline-secondary" onClick={() => handleDeleteComment(index)}>
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
