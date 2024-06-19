// src/App.js
import './App.css';
import React, { useEffect, useState } from 'react';
import WatchVideo from './videoWatch/WatchVideo';
import { useTheme } from './themeContext/ThemeContext';
import { Route, Routes } from 'react-router-dom';
import RegisterBox from './registerBox/RegisterBox';
import SignInBox from './signInBox/SignInBox';
import MainScreen from './mainScreen/MainScreen';
import UploadVideo from './uploadVideo/UploadVideo';
import videoData from './videosLibrary/VideosLibrary.json';
import UpperBar from './upperBar/UpperBar';

function App() {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
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

  // Apply the dark-mode or light-mode class to the body tag
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="App">
      <UpperBar setSearchQuery={setSearchQuery} setTagFilter={setTagFilter} />
      <Routes>
        <Route path='/' element={<MainScreen videos={filteredVideos} setTagFilter={setTagFilter} />} />
        <Route path="/register" element={<RegisterBox />} />
        <Route path="/signIn" element={<SignInBox />} />
        <Route path='/uploadVideo' element={<UploadVideo addVideo={addVideo} />} />
        <Route path="/WatchVideo/:videoId" element={<WatchVideo />} />
      </Routes>
    </div>
  );
}

export default App;
