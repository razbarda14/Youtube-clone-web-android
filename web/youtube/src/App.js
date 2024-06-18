

import './App.css';    
import React, { useEffect, useState } from 'react';
import WatchVideo from './VideoWatch/WatchVideo';
import DarkModeToggle from './ScreenMode/DarkModeToggle';
import { useTheme } from './ScreenMode/ThemeContext';
import { Route, Routes, Link } from 'react-router-dom';
import AuthBox from './register/authbox/AuthBox';
import Login from './register/login/Login';
import MainScreen from './mainScreen/MainScreen'; 
import UploadVideo from './uploadVideo/UploadVideo';
import videoData from './videosLibrary/VideosLibrary.json'; // Import the JSON file
import UpperBar from './upperBar/UpperBar';

function App() {
   const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    // Load the video data from the imported JSON file
    setVideoList(videoData);
  }, []);

  const filteredVideos = videoList.filter(video => {
    const matchesTag = tagFilter === 'all' || video.topic.toLowerCase() === tagFilter.toLowerCase();
    const matchesSearch = searchQuery === '' || video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const addVideo = (newVideo) => {
    setVideoList([...videoList, newVideo]);
  };

  return (
    <div className="App">
     <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <DarkModeToggle />
      </div>
      <UpperBar setSearchQuery={setSearchQuery} setTagFilter={setTagFilter} />
      {/* <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav> */}
      <Routes>
        <Route path='/' element={<MainScreen videos={filteredVideos} setTagFilter={setTagFilter} />} />
        <Route path='/uploadVideo' element={<UploadVideo addVideo={addVideo} />} />
 <Route path="/WatchVideo/:videoId" element={<WatchVideo />} />
          <Route path="/WatchVideo" element={<WatchVideo />} />
          <Route path="/register" element={<AuthBox />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;
