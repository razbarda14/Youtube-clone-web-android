import React from 'react';
import SuggestedVideoItem from './SuggestedVideoItem';
import './WatchVideos.css';
import './SuggestedVideos';

function SuggestedVideos({videoData, onVideoSelect}) {

  return (
    <div className='suggested-videos'> 
      <h4>Suggested Videos</h4>
      {videoData.map(video => (
        <SuggestedVideoItem 
          key={video.id} 
          video={video} 
          onVideoClick={() => onVideoSelect(video)} // Pass the video object
        />
      ))}
    </div>
  );
}

export default SuggestedVideos;
