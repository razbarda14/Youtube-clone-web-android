import React from 'react';
import Toolbar from './Toolbar';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './CurrentVideo';
import './WatchVideos.css';
import upThumb from './hand-thumbs-up.svg'
import downThumb from './hand-thumbs-down.svg'
import Share from './share.svg'

function WatchVideo() {
  return (
    <div>
      <Toolbar />
      <div className="container mt-4">
        <div className="row">
          {/* Suggested Videos (Now on the left) */}
          <div className="col-md-4">
            <h4>Suggested Videos</h4>
            <SuggestedVideos />
          </div>

          {/* Current Video (Now on the right) */}
          <div className="col-md-8">
          <div className="current-video-padding">
            <CurrentVideo />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default WatchVideo;
