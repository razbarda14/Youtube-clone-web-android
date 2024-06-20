import React from 'react';
import { Link } from 'react-router-dom';

import './SuggestedVideoItem.css';

function SuggestedVideoItem({ video, onVideoClick }) {

  return (

    <div>
      <Link to={`/WatchVideo/${video.id}`} className='no-underline'>
        <div className="card card-hover-effect" onClick={() => onVideoClick(video)}>
          <img src={video.thumbnail} className="card-img" alt={video.title}></img>
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
