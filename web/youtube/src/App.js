import './App.css';
import React from 'react';
import WatchVideo from './VideoWatch/WatchVideo';
import DarkModeToggle from './ScreenMode/DarkModeToggle';
import { useTheme } from './ScreenMode/ThemeContext';
import { Routes, Route } from 'react-router-dom';
import CurrentVideo from './VideoWatch/VideoCurrent/CurrentVideo';
import videoData from './videodata.json';

function App() {
  const { darkMode } = useTheme();
  return (
    <div>
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <DarkModeToggle />
        <Routes>
          <Route path="/WatchVideo" element={<WatchVideo />} />         
        </Routes>
      </div>
      
    </div>

  );
}

export default App;


// {videoData.map(video => (
//   <Route 
//     key={video.id} 
//     path={video.path} // Use the path from your video data
//     element={<WatchVideo video={video} />} 
//   />
// ))}