import './App.css';
import UpperBar from './upperBar/UpperBar';
import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
      <Routes>
        <Route path='/' element={<MainScreen videos={filteredVideos} setTagFilter={setTagFilter} />} />
        <Route path='/uploadVideo' element={<UploadVideo addVideo={addVideo} />} />
      </Routes>
    </div>
  );
}

export default App;
