import React from 'react';
import { Link } from 'react-router-dom';

import './SuggestedVideoItem.css';

function SuggestedVideoItem({ video, onVideoClick }) {

  return (

    <div>
      <Link to={`/WatchVideo/${video.id}`} className='no-underline'>
        <div className="card card-hover-effect" onClick={() => onVideoClick(video)}>

          <video
            className="card-img-top"
            width="400"
            controls={false}
            preload="metadata"
          >
            <source src={`${video.videoPath}#t=0.5`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>


          <div className='card-body'>
            <h5 className="card-title">{video.title}</h5>
            <div>{video.channel}</div>
            <p className="card-text"></p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SuggestedVideoItem;
