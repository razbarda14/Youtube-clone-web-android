import React from 'react';


function SuggestedVideoItem({ video }) {
  return (
    <div className="card mb-2">
      <img src={video.thumbnail} className="card-img-top" alt={video.title} />
      <div className="card-body">
        <h5 className="card-title">{video.title}</h5>
        <p className="card-text">{video.channel}</p>
      </div>
    </div>
  );
}

export default SuggestedVideoItem;
