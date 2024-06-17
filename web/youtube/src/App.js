import React, { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AuthBox from './AuthBox';
import Login from './Login';

function App() {
  useEffect(() => {
    // Retrieve and log user data when the App component mounts
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      console.log('User Data:', userData);
    } else {
      console.log('No user data found');
    }
  }, []);

  return (
    <div className="App">
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<AuthBox />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
