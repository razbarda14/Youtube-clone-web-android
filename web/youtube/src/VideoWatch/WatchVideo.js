import React from 'react';
import Toolbar from './Toolbar';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './VideoCurrent/CurrentVideo';
import './WatchVideos.css';

function WatchVideo() {
  return (
    <div>
      <Toolbar />
      <div className="container mt-4">
        <div className="row"> 
          {/* Current Video (Now on the right) */}
          <div className="col-md-8">
            <div className="current-video-padding">
              <CurrentVideo />
            </div>
          </div>
          {/* Suggested Videos (Now on the left) */}
          <div className="col-md-4">
            <SuggestedVideos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchVideo;
