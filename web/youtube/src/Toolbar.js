import React from 'react';
import './Toolbar.css';
import youTubeIcon from './youtube.svg';
function Toolbar() {
  return (
    <div className="toolbar d-flex justify-content-between align-items-center p-2 bg-light">
      {/* Left section */}
      <div className="left-section d-flex align-items-center">
    <a href="/" className="navbar-brand">
      <img 
        src="/path/to/your-logo.png" /* Replace with the actual path to your logo */
        alt="The Best Youtube" 
        height="30" /* Adjust the height as needed */
        className="d-inline-block align-top" /* Bootstrap classes for vertical alignment */
      />
     
      {/* Optional: Add text next to the logo */}
      {/* <span className="ms-2">Your App Name</span> */}
    </a>
</div>


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
      <button type="button" class="btn btn-outline-dark">ScreenMode</button>
        <button type="button" class="btn btn-outline-danger">YouTube  
        <img src={youTubeIcon} alt="Notifications" className="img-fluid"  />
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
