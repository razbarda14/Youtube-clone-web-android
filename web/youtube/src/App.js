import './App.css';
import React from 'react';
import WatchVideo from './VideoWatch/WatchVideo';
import DarkModeToggle from './ScreenMode/DarkModeToggle';
import { useTheme } from './ScreenMode/ThemeContext';
import { Routes, Route } from 'react-router-dom';

function App() {
  const { darkMode } = useTheme();
  return (
    <div>
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <DarkModeToggle />
        <Routes>
          <Route path="/WatchVideo/:videoId" element={<WatchVideo />} />
          <Route path="/WatchVideo" element={<WatchVideo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
