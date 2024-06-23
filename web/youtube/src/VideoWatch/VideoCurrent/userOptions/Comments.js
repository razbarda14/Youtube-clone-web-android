import React, { useState, useEffect } from 'react';

function Comments({ video, onCommentAdd, onCommentDelete, onCommentEdit, resetComments, currentUser }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(video.comments || []);
  const [editingComment, setEditingComment] = useState(null);
  const [addCommentText, setAddCommentText] = useState('');

  useEffect(() => {
    setComments(video.comments || []);
    if (resetComments) {
      setNewComment('');
      setEditingComment(null);
      setAddCommentText('');
    }
  }, [video, resetComments]);

  const handleAddInputChange = (event) => {
    setAddCommentText(event.target.value);
  };

  const handleAddComment = () => {
    if (addCommentText.trim() !== '') {
      onCommentAdd(video.id, addCommentText);
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
    setEditingComment({ index, text: comment });
  };

  const handleSaveComment = (index) => {
    if (editingComment.text.trim() !== '') {
      onCommentEdit(video.id, index, editingComment.text);
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
        <p className="mt-3">Please sign in to write a comment.</p>
      )}
      <div className="comments-section mt-3">
        {comments.map((comment, index) => (
          <div className='container-fluid' key={index}>
            <div className='row'>
              <div className='col-1 align-items-center'>
                <i className="bi bi-person-circle"></i>
              </div>
              <div className='col-4'>
                <div className='row'>
                  @username
                </div>
                <div className='row'>
                  <div className="comment-container">
                    {editingComment && editingComment.index === index ? (
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control"
                          value={editingComment.text}
                          onChange={(e) => handleEditInputChange(e, index)}
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
                        <p>{comment}</p>
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
