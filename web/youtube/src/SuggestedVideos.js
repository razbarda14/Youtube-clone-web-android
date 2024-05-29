import React from 'react';
import SuggestedVideoItem from './SuggestedVideoItem';
import videoData from './videodata.json'; // Adjust the path if necessary
import thumbnail1 from './thumbnail1.jpg';
import thumbnail2 from './thumbnail2.jpg';



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
