import './App.css';
import UpperBar from './upperBar/UpperBar';
import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import MainScreen from './mainScreen/MainScreen';
import UploadVideo from './uploadVideo/UploadVideo';
import videos from './videoLibrary/videosLibrary';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [videoList, setVideoList] = useState(videos);

  const filteredVideos = videoList.filter(video => {
    const matchesTag = tagFilter === 'all' || video.topic.toLowerCase() === tagFilter.toLowerCase();
    const matchesSearch = searchQuery === '' || video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="App">
      <UpperBar setSearchQuery={setSearchQuery} setTagFilter={setTagFilter} />
      <Routes>
        <Route path='/' element={<MainScreen videos={filteredVideos} setTagFilter={setTagFilter} />} />
        <Route path='/uploadVideo' element={<UploadVideo />} />
      </Routes>
    </div>
  );
}

export default App;
