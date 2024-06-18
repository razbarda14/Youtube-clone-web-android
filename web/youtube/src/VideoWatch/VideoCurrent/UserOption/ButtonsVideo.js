import React, { useState, useEffect } from 'react'; // Import useState
import upThumb from '../../photosVideo/hand-thumbs-up.svg';
import downThumb from '../../photosVideo/hand-thumbs-down.svg';
import upThumbBlack from '../../photosVideo/hand-thumbs-up-fill.svg';
import downThumbBlack from '../../photosVideo/hand-thumbs-down-fill.svg';
import Share from '../../photosVideo/share.svg';
import Download from '../../photosVideo/download.svg';
import bell from '../../photosVideo/bell.svg';

function ButtonsVideo({ video, onLikeToggle, onDislikeToggle }) {
  // Likes State: initial value of 500
  const [, setLikes] = useState(video.likes);
  const [, setIsLiked] = useState(false);
  const [, setIsDisliked] = useState(false);

  useEffect(() => {
    setLikes(video.likes);
    setIsLiked(false);
    setIsDisliked(false);
  }, [video]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div>
      {/* Buttons */}
      <div className="video-buttons mt-3">
        <button 
          className={`btn btn-light ${video.isDisliked ? 'active-dislike' : ''}`} 
          onClick={() => onDislikeToggle(video.id)} 
        >
          <img src={video.isDisliked ? downThumbBlack : downThumb} alt="Dislike" className="img-fluid" />
        </button>
        <button
          className={`btn btn-light ${video.isLiked ? 'active-like' : ''}`}
          onClick={() => onLikeToggle(video.id)}
        >
          {video.likes}
          <img src={video.isLiked ? upThumbBlack : upThumb} alt="Like" className="img-fluid" />
        </button>

        <button className="btn btn-light" onClick={handleShare}>Share
          <img src={Share} alt="Share" className="img-fluid" />
        </button>
        <button className="btn btn-light">Subscribe
          <img src={bell} alt="Subscribe" className="img-fluid" />
        </button>
      </div>
    </div>
  );
}

export default ButtonsVideo;
