// import React from 'react';
// import SuggestedVideoItem from './SuggestedVideoItem';
// import './WatchVideos.css';
// import { useTheme } from '../ScreenMode/ThemeContext';


// function SuggestedVideos({videoData, onVideoSelect}) {
//   const { darkMode } = useTheme();
//   return (
//     <div>

//     <a className='card' href='details.html'>
//     <div className={`suggested-videos ${darkMode ? 'dark-mode' : 'light-mode'}`}> 
      
//       {videoData.map(video => (
//         <SuggestedVideoItem 
//           key={video.id} 
//           video={video} 
//           onVideoClick={() => onVideoSelect(video)} // Pass the video object
//         />
//       ))}
//     </div>
//     </a>
//     </div>
//   );
// }

// export default SuggestedVideos;

