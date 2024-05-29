import React from 'react';
import Toolbar from './Toolbar';
import SuggestedVideos from './SuggestedVideos';
import CurrentVideo from './CurrentVideo';
import './WatchVideos.css';

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
            <CurrentVideo />
             {/* Buttons */}
             <div className="video-buttons mt-3">
                  <button className="btn btn-light">Like</button>
                  <button className="btn btn-light">Share</button>
                  <button className="btn btn-light">Comment</button>
                  {/* ... Add other buttons ... */}
                </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default WatchVideo;
