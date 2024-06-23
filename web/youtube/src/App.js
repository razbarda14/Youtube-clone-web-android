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
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState({});

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

  const addComment = (videoId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: [...(prevComments[videoId] || []), comment]
    }));
  };

  const editComment = (videoId, commentIndex, newComment) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].map((comment, index) =>
        index === commentIndex ? newComment : comment
      )
    }));
  };

  const deleteComment = (videoId, commentIndex) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].filter((_, index) => index !== commentIndex)
    }));
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
      <UpperBar
        setSearchQuery={setSearchQuery}
        setTagFilter={setTagFilter}
        currentUser={currentUser}
        logoutUser={logoutUser}
      />
      <Routes>
        <Route path='/' element={<MainScreen videos={filteredVideos} setTagFilter={setTagFilter} />} />
        <Route path="/register" element={<RegisterBox registerUser={registerUser} users={users} />} />
        <Route path="/signIn" element={<SignInBox loginUser={loginUser} />} />
        <Route path='/uploadVideo' element={<UploadVideo addVideo={addVideo} user={currentUser} />} />
        <Route path="/WatchVideo/:videoId" element={<WatchVideo comments={comments} addComment={addComment} editComment={editComment} deleteComment={deleteComment} currentUser={currentUser} videoList={videoList} />} />
      </Routes>
    </div>
  );
}

export default App;
