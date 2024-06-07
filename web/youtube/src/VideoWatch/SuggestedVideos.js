import React from 'react';
import SuggestedVideoItem from './SuggestedVideoItem';
import videoData from '../videodata.json'; // Adjust the path if necessary

function SuggestedVideos() {
  return (
    <div className="suggested-videos">
        <h4>Suggested Videos</h4>
      {videoData.map(video => (
        
        <SuggestedVideoItem key={video.id} video={video} />
     
      ))}
    </div>
  );
}

export default SuggestedVideos;
