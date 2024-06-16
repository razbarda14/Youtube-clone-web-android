// Comments.js
import React, { useState } from 'react'; // Import useState

function Comments({ video, onCommentAdd, onCommentDelete, onCommentEdit }) {
  const [newComment, setNewComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '' && onCommentAdd) {
      onCommentAdd(video.id, newComment); 
      setNewComment('');
    }
  };

  const handleCancelComment = () => {
    setNewComment('');
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditedCommentText(video.comments[index]);
  };

  const handleSaveComment = () => {
    onCommentEdit(video.id, editingCommentIndex, editedCommentText);
    setEditingCommentIndex(null);
    setEditedCommentText('');
  };

  const handleDeleteComment = (index) => {
    onCommentDelete(video.id, index);
  };

  return (
    <div>
      {/* Comment Input and Buttons */}
      <div className="input-group mt-3">
        {editingCommentIndex !== null ? (
          <>
            <input
              type="text"
              className="form-control"
              value={editedCommentText}
              onChange={(e) => setEditedCommentText(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" onClick={handleSaveComment}>Save</button>
              <button className="btn btn-outline-secondary" onClick={() => setEditingCommentIndex(null)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              className="form-control"
              placeholder="Add a comment..."
              value={newComment}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleAddComment}
                disabled={newComment.trim() === ''}
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
          </>
        )}
      </div>

      {/* Comments Section */}
      <div className="comments-section mt-3">
        {video && video.comments && video.comments.map((comment, index) => (
          <div key={index} className="comment-container">
            {editingCommentIndex === index ? (
              <input
                type="text"
                value={editedCommentText}
                onChange={(e) => setEditedCommentText(e.target.value)}
              />
            ) : (
              <p>{comment}</p>
            )}
            {editingCommentIndex !== index && (
              <>
                <button className="btn btn-outline-secondary" onClick={() => handleEditComment(index)}>Edit</button>
                <button className="btn btn-outline-secondary" onClick={() => handleDeleteComment(index)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Comments;