import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import MainScreen from './mainScreen/MainScreen';
import UploadVideo from './uploadVideo/UploadVideo';
import UpperBar from './upperBar/UpperBar';

function App() {

  return (

    <div className="App">

      <UpperBar />

      <Routes>
        <Route path='/' element={<MainScreen />}></Route>
        <Route path='/uploadVideo' element={<UploadVideo />}></Route>
      </Routes>

    </div>

  );
}

export default App;
