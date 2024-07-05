import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useTheme } from './themeContext/ThemeContext';
import WatchVideo from './videoWatch/WatchVideo';
import RegisterBox from './registerBox/RegisterBox';
import SignInBox from './signInBox/SignInBox';
import MainScreen from './mainScreen/MainScreen';
import UploadVideo from './uploadVideo/UploadVideo';
import videoData from './videosLibrary/VideosLibrary.json';
import UpperBar from './upperBar/UpperBar';
import { loginUser as authLoginUser, fetchProtectedData } from './services/authService';

function App() {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [videoList, setVideoList] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setVideoList(videoData);

    const checkUserAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await fetchProtectedData('auth/verify-user');
          if (user) {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error('Error verifying user:', error);
        }
      }
    };

    checkUserAuthentication();
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

  const checkUserAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await fetchProtectedData('auth/verify-user');
        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    }
  };

  checkUserAuthentication();

  const loginUser = async (userName, password) => {
    try {
      const user = await authLoginUser(userName, password);
      if (user) {
        setCurrentUser(user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
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

  const deleteVideo = (videoId) => {
    setVideoList(prevVideoList => prevVideoList.filter(video => video.id !== videoId));
  };

  const editVideo = (videoId, newTitle, newDescription) => {
    setVideoList(prevVideoList =>
      prevVideoList.map(video => {
        if (video.id === videoId) {
          return {
            ...video,
            title: newTitle,
            description: newDescription
          };
        } else {
          return video;
        }
      })
    );
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
        <Route path="/WatchVideo/:videoId" element={<WatchVideo comments={comments} addComment={addComment} editComment={editComment} deleteComment={deleteComment} currentUser={currentUser} videoList={videoList} deleteVideo={deleteVideo} editVideo={editVideo} setVideoList={setVideoList} />} />
      </Routes>
    </div>
  );
}

export default App;
