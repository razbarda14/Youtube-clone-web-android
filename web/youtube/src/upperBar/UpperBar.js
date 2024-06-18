import './UpperBar.css'; // Import the CSS file for upperBar
import youtubeLogo from "../img/youtube-logo.jpg";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function UpperBar({ setSearchQuery, setTagFilter }) {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(inputValue);
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    setInputValue('');
    setTagFilter('all');
  };

  return (
    <div className="container-fluid upper-bar">
      <div className="row align-items-center">
        <div className="col-4 d-flex align-items-center my-height">
          <Link to='/' onClick={handleLogoClick}>
            <img src={youtubeLogo} alt="Clickable" height="60px" />
          </Link>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-center my-height">
          <div className="input-group mb-3 push-down">
            <input
              type="text"
              className="form-control no-outline"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-outline-secondary custom-button"
              type="button"
              id="button-addon2"
              onClick={handleSearchClick}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div className="col-2 d-flex align-items-center justify-content-center my-height">
          <Link to='/uploadVideo'>
            <button type="button" className="btn btn-outline-secondary">
              <i className="bi bi-upload"></i>
            </button>
          </Link>
        </div>
        <div className="col-2 d-flex align-items-center justify-content-center my-height">
          <button type="button" className="btn btn-outline-secondary me-2">
            <i className="bi bi-moon"></i>
          </button>
          <Link to='/signIn'>
            <button type="button" className="btn btn-outline-primary align-middle">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UpperBar;
