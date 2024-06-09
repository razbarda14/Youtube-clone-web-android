import React, { useState } from 'react'; // Import useState
import './CurrentVideo.css';
import upThumb from '../photosVideo/hand-thumbs-up.svg';
import downThumb from '../photosVideo/hand-thumbs-down.svg';
import upThumbBlack from '../photosVideo/hand-thumbs-up-fill.svg';
import downThumbBlack from '../photosVideo/hand-thumbs-down-fill.svg';
import Share from '../photosVideo/share.svg';
import Download from '../photosVideo/download.svg';
import bell from '../photosVideo/bell.svg';
// const video = {
//   id: 1,
//   title: 'Eyal Golan',
//   description: 'Blumfid 2024.',
//   channel: 'Channel Name ',
//   views: '100M views',
//   uploadDate: '1 sec ago',
//   videoUrl: '/VID_142421208_140947_463.mp4', // This would be a URL to the video file or video platform
//   thumbnail: '/IMG_20220513_111520_238.jpg' // Used as a placeholder before the video plays
// };

function CurrentVideo({video}) { // Receive video as a prop
 // Comments State
 const [newComment, setNewComment] = useState('');
 const [comments, setComments] = useState([]);
 const [editingCommentIndex, setEditingCommentIndex] = useState(null);
 const [editedCommentText, setEditedCommentText] = useState('');

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };
  // add comment
  const handleAddComment = () => {
    // Check if comment is not empty
    if (newComment.trim() !== '') {
      // Add to the end of the array
      setComments([...comments, newComment]);
      // Clear the input field
      setNewComment('');
    }
  };
  // if i want to clear the text
  const handleCancelComment = () => {
    // Clear the input field
    setNewComment('');
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditedCommentText(comments[index]);
  };

  const handleSaveComment = () => {
    const updatedComments = [...comments];
    updatedComments[editingCommentIndex] = editedCommentText;
    setComments(updatedComments);
    setEditingCommentIndex(null);
    setEditedCommentText('');
  };

  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  // Likes State: initial value of 500
  const [likes, setLikes] = useState(500);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLikeClick = () => {
    // Toggle liked state
    setIsLiked(!isLiked);

    // If disliked, remove dislike and add a like
    if (isDisliked) {
      setIsDisliked(false);
      // +1 for new like, +1 for removing dislike
      setLikes(likes + 1); 
    } else {
      // Otherwise, adjust like count based on previous state
      setLikes(isLiked ? likes - 1 : likes + 1);
    }
  };

  const handleDislikeClick = () => {
    // Toggle disliked state
    setIsDisliked(!isDisliked);

    // If liked, remove like and add a dislike
    if (isLiked) {
      setIsLiked(false);
      // -1 for new dislike, -1 for removing like
      setLikes(likes - 1); 
    } else {
      // Otherwise, adjust like count based on previous state
      setLikes(isDisliked ? likes : likes);
    }
  };

  
  return (
    <div>
      {/* Watch Current Video */}
      <div className="current-video">
        <div className="mb-3">
          <video className="video-player" controls poster={video.thumbnail}>
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <div className="d-flex justify-content-between">
          <span>{video.channel}
            {video.views} • {video.uploadDate}</span>
        </div>
        
        {/* Buttons */}
        <div className="video-buttons mt-3">
          <button className={`btn btn-light ${isDisliked ? 'active-dislike' : ''}`} onClick={handleDislikeClick}>
            <img src={isDisliked ? downThumbBlack : downThumb} alt="Dislike" className="img-fluid" />
          </button>
          <button className={`btn btn-light ${isLiked ? 'active-like' : ''}`} onClick={handleLikeClick}>
            {likes}
            <img src={isLiked ? upThumbBlack : upThumb} alt="Like" className="img-fluid" />
          </button>

          <button className="btn btn-light">Share
            <img src={Share} alt="Notifications" className="img-fluid" />
          </button>
          <button className="btn btn-light">Download
            <img src={Download} alt="Notifications" className="img-fluid" />
          </button>
          <button className="btn btn-light">Subscribe
            <img src={bell} alt="Notifications" className="img-fluid" />
          </button>

          </div>


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
              <button onClick={handleSaveComment}>Save</button>
              <button onClick={() => setEditingCommentIndex(null)}>Cancel</button>
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
        {comments.map((comment, index) => (
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
                <button onClick={() => handleEditComment(index)}>Edit</button>
                <button onClick={() => handleDeleteComment(index)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>

      </div>
    </div>
  );
}

export default CurrentVideo;
