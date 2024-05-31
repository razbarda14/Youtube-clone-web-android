import React from 'react';
import SuggestedVideoItem from './SuggestedVideoItem';
import videoData from './videodata.json'; // Adjust the path if necessary




function SuggestedVideos() {
  return (
    <div className="suggested-videos">
      {videoData.map(video => (
        <SuggestedVideoItem key={video.id} video={video} />
      ))}
    </div>
  );
}

export default SuggestedVideos;
