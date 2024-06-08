import React, { useState } from 'react';
import './AuthBox.css';

function AuthBox() {
  // State variables to manage user input and validation
  const [userName, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isUserNameValid, setIsUserNameValid] = useState(true); // Start with valid state
  const [isDisplayNameValid, setIsDisplayNameValid] = useState(true); // Start with valid state
  const [isPasswordValid, setIsPasswordValid] = useState(true); // Start with valid state
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true); // Start with matching passwords

  // Function to handle changes in the userName input
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    // Check if the username contains both letters and numbers
    setIsUserNameValid(/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(e.target.value));
  };

  // Function to handle changes in the displayName input
  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    // Check if the display name is not empty
    setIsDisplayNameValid(e.target.value.trim() !== '');
  };

  // Function to handle changes in the password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Check if the password length is at least 8 characters
    setIsPasswordValid(e.target.value.length >= 8);
    // Check if the verify password matches the new password
    setDoPasswordsMatch(e.target.value === verifyPassword);
  };

  // Function to handle changes in the verify password input
  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
    // Check if the passwords match
    setDoPasswordsMatch(e.target.value === password);
  };

  // Function to handle changes in the photo input
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check before submitting
    const isUserNameValidFinal = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(userName);
    const isDisplayNameValidFinal = displayName.trim() !== '';
    const isPasswordValidFinal = password.length >= 8;
    const doPasswordsMatchFinal = password === verifyPassword;

    setIsUserNameValid(isUserNameValidFinal);
    setIsDisplayNameValid(isDisplayNameValidFinal);
    setIsPasswordValid(isPasswordValidFinal);
    setDoPasswordsMatch(doPasswordsMatchFinal);

    // If any validation fails, prevent form submission
    if (!isUserNameValidFinal || !isDisplayNameValidFinal || !isPasswordValidFinal || !doPasswordsMatchFinal) {
      return;
    }

    // Save user data in local storage
    const userData = {
      userName,
      displayName,
      password,
      photo: photo ? URL.createObjectURL(photo) : null,
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    // Add your submission logic here
    alert('Registration successful!');
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className='container'>
        <div className="card">
          <div className="card-body">
            <div className="container overflow-hidden text-center">
              {/* Form for user input */}
              <form noValidate onSubmit={handleSubmit}>
              <div className="row gy-5">
                <div className="col-6">
                  <div className="p-3 text-start">
                    {/* Title and description */}
                    <h5 className="card-title">Sign in / Register</h5>
                    <p className="card-text">To continue to YouTube</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3">
                    
                      <div className="form-floating mb-3">
                        {/* Username input with validation */}
                        <input 
                          type="text"
                          className={`form-control ${!isUserNameValid ? 'is-invalid' : ''}`}
                          id="userName"
                          placeholder="Username"
                          value={userName} // Link with userName state
                          onChange={handleUserNameChange} // Call handleUserNameChange on change 
                          required
                        />
                        <label htmlFor="userName">Username</label>
                        <div className="invalid-feedback">Please enter a valid username containing both letters and numbers.</div>
                      </div>
                      <div className="form-floating mb-3">
                        {/* Display name input with validation */}
                        <input 
                          type="text"
                          className={`form-control ${!isDisplayNameValid ? 'is-invalid' : ''}`}
                          id="displayName"
                          placeholder="Display Name"
                          value={displayName} // Link with displayName state
                          onChange={handleDisplayNameChange} // Call handleDisplayNameChange on change 
                          required
                        />
                        <label htmlFor="displayName">Display Name</label>
                        <div className="invalid-feedback">Please enter a display name.</div>
                      </div>
                      <div className="form-floating mb-3">
                        {/* Password input with validation */}
                        <input 
                          type="password"
                          className={`form-control ${!isPasswordValid ? 'is-invalid' : ''}`}
                          id="password"
                          placeholder="Password"
                          value={password} // Link with password state
                          onChange={handlePasswordChange} // Call handlePasswordChange on change
                          required
                        />
                        <label htmlFor="password">Password</label>
                        <div className="invalid-feedback">Password must be at least 8 characters long.</div>
                      </div>
                      <div className="form-floating mb-3">
                        {/* Verify password input with validation */}
                        <input 
                          type="password"
                          className={`form-control ${!doPasswordsMatch ? 'is-invalid' : ''}`}
                          id="verifyPassword"
                          placeholder="Verify Password"
                          value={verifyPassword} // Link with verifyPassword state
                          onChange={handleVerifyPasswordChange} // Call handleVerifyPasswordChange on change
                          required
                        />
                        <label htmlFor="verifyPassword">Verify Password</label>
                        <div className="invalid-feedback">Passwords do not match.</div>
                      </div>
                      <div className="mb-3">
                        {/* Photo input */}
                        <label htmlFor="photo" className="form-label">Profile Photo</label>
                        <input 
                          type="file"
                          className="form-control"
                          id="photo"
                          onChange={handlePhotoChange} // Call handlePhotoChange on change
                          required
                        />
                        {photo && (
                          <div className="mt-3">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="Profile Preview"
                              className="img-thumbnail"
                              style={{ width: '150px', height: '150px' }}
                            />
                          </div>
                        )}
                      </div>
                      
                    
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3">
                    {/* Placeholder div for alignment */}
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3">
                    {/* Sign up button */}
                    <button type="button" className="btn btn-light me-5">Sign up</button>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                  </div>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <script src="script.js"></script> */}
    </div>
  );
}

export default AuthBox;
