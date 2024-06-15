import './UpperBar.css'; // Import the CSS file for upperBar
import youtubeLogo from "../img/youtube-logo.jpg";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function UpperBar({ setSearchQuery }) {
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
  };

  return (
    <div className="container-fluid upper-bar">
      <div className="row">
        <div className="col-4">
          <nav>
            <Link to='/' onClick={handleLogoClick}>
              <img src={youtubeLogo} alt="Clickable" height="60px" />
            </Link>
          </nav>
        </div>
        <div className="col-4">
          <div className="input-group mb-3 p-2">
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
        <div className="col-2">
          <nav>
            <Link to='/uploadVideo'>
              <button type="button" className="btn btn-outline-secondary">
                <i className="bi bi-upload"></i>
              </button>
            </Link>
          </nav>
        </div>
        <div className="col-2">
          <button type="button" className="btn btn-outline-secondary">
            <i className="bi bi-moon"></i>
          </button>
          <button type="button" className="btn btn-outline-primary align-middle">Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default UpperBar;
