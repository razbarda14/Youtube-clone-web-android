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
        <WatchVideo />
        <Routes>
          <Route path="/" element={<WatchVideo />} /> 
          {videoData.map(video => (
            <Route 
              key={video.id} 
              path={video.path} // Use the path from your video data
              element={<CurrentVideo video={video} />} 
            />
          ))}
        </Routes>
      </div>
    </div>

  );
}

export default App;
{/* <div>
<Routes>
  <Route path="/" element={<WatchVideo />} />
</Routes>
</div> */}