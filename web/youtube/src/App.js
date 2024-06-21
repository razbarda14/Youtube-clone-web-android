import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTheme } from './themeContext/ThemeContext';

import WatchVideo from './videoWatch/WatchVideo';
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    setVideoList(videoData);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const filteredVideos = videoList.filter(video => {
    const matchesTag = tagFilter === 'all' || video.topic.toLowerCase() === tagFilter.toLowerCase();
    const matchesSearch = searchQuery === '' || video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const addVideo = (newVideo) => {
    setVideoList([...videoList, newVideo]);
  };

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
      <UpperBar setSearchQuery={setSearchQuery} setTagFilter={setTagFilter} user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<MainScreen videos={filteredVideos} setTagFilter={setTagFilter}/>}/>
        <Route path="/register" element={<RegisterBox setUser={setUser}/>}/>
        <Route path="/signIn" element={<SignInBox setUser={setUser}/>}/>
        <Route path='/uploadVideo' element={<UploadVideo addVideo={addVideo} user={user}/>}/>
        <Route path="/WatchVideo/:videoId" element={<WatchVideo/>}/>
      </Routes>
    </div>
  );
}

export default App;
