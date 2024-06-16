import React, { useState, useEffect } from 'react';

function Comments({video, onCommentAdd, onCommentDelete, onCommentEdit }) { 
    // Comments State
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(video.comments || []); 
    const [editingComment, setEditingComment] = useState(null); 

    const [addCommentText, setAddCommentText] = useState(''); 

    useEffect(() => {
        setComments(video.comments || []);
    }, [video]);

    // Input Change Handler for the Add Comment Field
    const handleAddInputChange = (event) => {
        setAddCommentText(event.target.value); 
    };
    // add comment
    const handleAddComment = () => {
        // Check if comment is not empty
        if (addCommentText.trim() !== '') {
            onCommentAdd(video.id, addCommentText);
            setAddCommentText('');
        }
    };
    // if i want to clear the text
    const handleCancelComment = () => {
        // Clear the input field
        setAddCommentText('');  // Clear the add comment field
        setEditingComment(null); // Clear the editing comment state
    };

    // Input Change Handler for the Edit Comment Field
    const handleEditInputChange = (event, index) => {
        if (editingComment && editingComment.index === index) {
          setEditingComment({ ...editingComment, text: event.target.value });
        }
    };

    const handleEditComment = (index, comment) => {
        setEditingComment({ index, text: comment });
    };
    const handleSaveComment = (index) => {
      if (editingComment.text.trim() !== "") { 
        onCommentEdit(video.id, index, editingComment.text);
        setEditingComment(null); 
      } else {
        alert("Comment cannot be empty."); 
      }
    };
  

    const handleDeleteComment = (index) => {
        onCommentDelete(video.id, index);
    };

    return (
        <div>
            {/* Comment Input and Buttons */}
            <div className="input-group mt-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a comment..."
                    value={addCommentText} // Use the addCommentText state
                    onChange={handleAddInputChange} // Use the new input change handler
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
            {/* Comments Section */}
            <div className="comments-section mt-3">
                {comments.map((comment, index) => (
                    <div key={index} className="comment-container">
                        {editingComment && editingComment.index === index ? ( 
                            <div className="d-flex">
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={editingComment.text} // Use editingComment.text
                                    onChange={(e) => handleEditInputChange(e, index)} // Pass index to update handler
                                />
                                <div className="input-group-append">
                                    <button 
                                      className="btn btn-outline-secondary" 
                                      onClick={() => handleSaveComment(index)}
                                      disabled={editingComment.text.trim() === ''} 
                                    >
                                      Save
                                    </button>
                                    <button className="btn btn-outline-secondary" onClick={() => handleCancelComment()}>Cancel</button> 
                                </div>
                            </div>
                        ) : (
                            <>
                                <p>{comment}</p>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" onClick={() => handleEditComment(index, comment)}>Edit</button>
                                    <button className="btn btn-outline-secondary" onClick={() => handleDeleteComment(index)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comments;
