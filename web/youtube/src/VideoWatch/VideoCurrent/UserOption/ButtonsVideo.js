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
          <img src={video.isLiked ? upThumbBlack : upThumb} alt="" className="img-fluid" />
        </button>

        <button className="btn btn-light">Share
          <img src={Share} alt="" className="img-fluid" />
        </button>
        <button className="btn btn-light">Subscribe
          <img src={bell} alt="" className="img-fluid" />
        </button>
      </div>
    </div>
  )
}

export default ButtonsVideo;