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

  const registerUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const loginUser = (userName, password) => {
    const user = users.find(user => user.userName === userName && user.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
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
    
      <UpperBar setSearchQuery={setSearchQuery} setTagFilter={setTagFilter}/>
    
      <Routes>
        <Route path='/' element={<MainScreen videos={filteredVideos} setTagFilter={setTagFilter}/>}/>
        <Route path="/register" element={<RegisterBox/>} />
        <Route path="/signIn" element={<SignInBox />}/>
        <Route path='/uploadVideo' element={<UploadVideo addVideo={addVideo}/>} />
        <Route path="/WatchVideo/:videoId" element={<WatchVideo/>} />
      </Routes>
    </div>
  );
}

export default App;
