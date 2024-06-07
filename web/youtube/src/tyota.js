
// import Toolbar from './Toolbar';
// import React, { useState } from 'react';
// import SuggestedVideos from './SuggestedVideos';
// import CurrentVideo from './VideoCurrent/CurrentVideo';
// import './WatchVideos.css';
// import videoData from '../videodata.json';

// function WatchVideo() {
//   const [selectedVideo, setSelectedVideo] = useState(videoData[0]);

//   return (
//     <div>
//       <Toolbar />
//       <div className="container mt-4">
//         <div className="row">
//           {/* Current Video (Now on the left) */}
//           <div className="col-md-8">
//             <div className="current-video-padding">
//               <CurrentVideo video={selectedVideo} />
//             </div>
//           </div>
//           {/* Suggested Videos (Now on the right) */}
//           <div className="col-md-4">
//             <SuggestedVideos onVideoSelect={setSelectedVideo} videoData={videoData} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WatchVideo;
