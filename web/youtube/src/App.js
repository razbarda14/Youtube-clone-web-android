import './App.css';
import React from 'react';
import WatchVideo from './VideoWatch/WatchVideo';
import DarkModeToggle from './ScreenMode/DarkModeToggle';
import { useTheme } from './ScreenMode/ThemeContext';
function App() {
  const { darkMode } = useTheme();
  return (
    <div>
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <DarkModeToggle /> 
      
      <WatchVideo/>
    </div>
   
    </div>
  );
}

export default App;
