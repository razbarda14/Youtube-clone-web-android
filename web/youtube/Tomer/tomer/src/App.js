import './App.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import UpperBar from './upperBar/UpperBar';
import MainScreen from './mainScreen/MainScreen';
import UploadVideo from './uploadVideo/UploadVideo';
import videos from './videoLibrary/videosLibrary';

function App() {

  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <div className="App">

      <UpperBar setSearchQuery={setSearchQuery}/>

      <Routes>
      <Route path='/' element={<MainScreen videos={filteredVideos}/>} />
      <Route path='/uploadVideo' element={<UploadVideo/>}></Route>
      </Routes>



    </div>

  );
}

export default App;
