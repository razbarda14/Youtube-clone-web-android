import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AuthBox from './AuthBox';
import Login from './Login';
import MainScreen from './mainScreen/MainScreen';
import UploadVideo from './uploadVideo/UploadVideo';
import videoData from './videosLibrary/VideosLibrary.json'; // Import the JSON file

function App() {
  
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
      <UpperBar setSearchQuery={setSearchQuery} setTagFilter={setTagFilter} />
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path='/' element={<MainScreen videos={filteredVideos} setTagFilter={setTagFilter} />} />
        <Route path='/uploadVideo' element={<UploadVideo addVideo={addVideo} />} />
          <Route path="/register" element={<AuthBox />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
