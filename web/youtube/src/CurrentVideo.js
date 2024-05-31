import React, { useState } from 'react'; // Import useState
import upThumb from './hand-thumbs-up.svg';
import downThumb from './hand-thumbs-down.svg';
import Share from './share.svg';

const currentVideoData = {
  id: 1,
  title: 'Current Video Title',
  description: 'This is the description of the current video.',
  channel: 'Channel Name',
  views: '1M views',
  uploadDate: '1 hour ago',
  videoUrl: '/path/to/video.mp4', // This would be a URL to the video file or video platform
  thumbnail: '/path/to/thumbnail.jpg' // Used as a placeholder before the video plays
};

function CurrentVideo() {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') { // Check if comment is not empty
      setComments([...comments, newComment]); // Add to the end of the array
      setNewComment(''); // Clear the input field
    }
  };

  const handleCancelComment = () => {
    setNewComment(''); // Clear the input field
  };

  return (
    <div>
    <div className="current-video">
      <div className="embed-responsive embed-responsive-16by9 mb-3">
      <video className="embed-responsive-item" controls poster={currentVideoData.thumbnail}>
          <source src={currentVideoData.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h3>{currentVideoData.title}</h3>
      <p>{currentVideoData.description}</p>
      <div className="d-flex justify-content-between">
        <span>{currentVideoData.channel}</span>
        <span>{currentVideoData.views} • {currentVideoData.uploadDate}</span>
      </div>
    </div>

    <div>
      
    </div>
        {/* Buttons */}
        <div className="video-buttons mt-3">
                  <button>
                  <button className="btn btn-light">
                  <img src={downThumb} alt="Notifications" className="img-fluid"  />
                  </button>
                  <button className="btn btn-light">
                  <img src={upThumb} alt="Notifications" className="img-fluid"  />
                  </button>
                  </button>
                  <button className="btn btn-light">Share-
                  <img src={Share} alt="Notifications" className="img-fluid"  />
                  </button>
                  </div>
           

      {/* Comment Input and Buttons */}
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleInputChange}
        />
        <div className="input-group-append"> {/* Add button group for styling */}
          <button 
            className="btn btn-outline-secondary" 
            type="button" class="btn btn-success" 
            onClick={handleAddComment} 
            disabled={newComment.trim() === ''}
          >
            Send
          </button>
          <button
            className="btn btn-outline-secondary" 
            type="button" class="btn btn-warning"
            onClick={handleCancelComment}
          >
            Cancel
          </button>
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="comments-section mt-3">
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
}

export default CurrentVideo;
