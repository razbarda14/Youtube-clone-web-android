import React from 'react';
import './Toolbar.css';
import youTubeIcon from './photosVideo/youtube.svg';
import { useTheme } from '../ScreenMode/ThemeContext';

function Toolbar() {
  const { darkMode } = useTheme(); // Access the darkMode state
  return (
    
    <div
    
    className={`toolbar d-flex justify-content-between align-items-center p-2 ${
      darkMode ? "bg-dark" : "bg-light"
    }`}
  >
      {/* Left section */}
     

      {/* Middle section - Search Input */}
      <div className="middle-section flex-grow-1 mx-3">
        <form className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>

      {/* Right section */}
      <div className="right-section d-flex">
        <button type="button" className="btn btn-outline-danger">
          YouTube
          <img src={youTubeIcon} alt="Notifications" className="img-fluid" />
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
