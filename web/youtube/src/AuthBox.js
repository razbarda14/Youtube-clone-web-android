import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthBox.css';

function AuthBox() {
  const [userName, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isDisplayNameValid, setIsDisplayNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [step, setStep] = useState(1);
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setIsUserNameValid(/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(e.target.value));
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    setIsDisplayNameValid(e.target.value.trim() !== '');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(e.target.value.length >= 8);
    setDoPasswordsMatch(e.target.value === verifyPassword);
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
    setDoPasswordsMatch(e.target.value === password);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const isUserNameValidFinal = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(userName);
    const isDisplayNameValidFinal = displayName.trim() !== '';
    const isPasswordValidFinal = password.length >= 8;
    const doPasswordsMatchFinal = password === verifyPassword;
  
    setIsUserNameValid(isUserNameValidFinal);
    setIsDisplayNameValid(isDisplayNameValidFinal);
    setIsPasswordValid(isPasswordValidFinal);
    setDoPasswordsMatch(doPasswordsMatchFinal);
  
    if (!isUserNameValidFinal || !isDisplayNameValidFinal || !isPasswordValidFinal || !doPasswordsMatchFinal) {
      return;
    }
  
    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const newUser = {
      userName,
      displayName,
      password,
      photo: photo ? URL.createObjectURL(photo) : null,
    };
  
    // Add new user to the array and save
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Registration successful!');
  };
  
  

  const handleNext = (e) => {
    e.preventDefault();

    const isUserNameValidFinal = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(userName);
    const isPasswordValidFinal = password.length >= 8;
    const doPasswordsMatchFinal = password === verifyPassword;

    setIsUserNameValid(isUserNameValidFinal);
    setIsPasswordValid(isPasswordValidFinal);
    setDoPasswordsMatch(doPasswordsMatchFinal);

    if (!isUserNameValidFinal || !isPasswordValidFinal || !doPasswordsMatchFinal) {
      return;
    }

    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    const userExists = users.some(user => user.userName === userName);
    if (userExists) {
      setUserNameError('Username already taken. Please choose another one.');
      setIsUserNameValid(false);
      return;
    }
    
    // Check if the password is already used by another user
    const passwordExists = users.some(user => user.password === password);
    if (passwordExists) {
      setPasswordError('Password already taken. Please choose another one.');
      setIsPasswordValid(false);
      return;
    }

    setStep(2);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className='container'>
        <div className="card">
          <div className="card-body">
            <div className="container overflow-hidden text-center">
              <div className="row gy-5">
                <div className="col-6">
                  <div className="p-3 text-start">
                    <h5 className="card-title">Sign in / Register</h5>
                    <p className="card-text">To continue to YouTube</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3">
                    <form noValidate onSubmit={handleSubmit}>
                      {step === 1 && (
                        <>
                          <div className="form-floating">
                            <input 
                              type="text"
                              className={`form-control ${!isUserNameValid ? 'is-invalid' : ''}`}
                              id="userName"
                              placeholder="Username"
                              value={userName}
                              onChange={handleUserNameChange}
                              required
                            />
                            <label htmlFor="userName">Username</label>
                            <div className="invalid-feedback">
                            {userNameError || 'Username must contain both letters and numbers.'}
                          </div>
                          </div>
                          <div className="form-floating">
                            <input 
                              type="password"
                              className={`form-control ${!isPasswordValid ? 'is-invalid' : ''}`}
                              id="password"
                              placeholder="Password"
                              value={password}
                              onChange={handlePasswordChange}
                              required
                            />
                            <label htmlFor="password">Password</label>
                            <div className="invalid-feedback">
                              {passwordError || 'Password must be at least 8 characters long.'}
                            </div>
                          </div>
                          <div className="form-floating">
                            <input 
                              type="password"
                              className={`form-control ${!doPasswordsMatch ? 'is-invalid' : ''}`}
                              id="verifyPassword"
                              placeholder="Verify Password"
                              value={verifyPassword}
                              onChange={handleVerifyPasswordChange}
                              required
                            />
                            <label htmlFor="verifyPassword">Verify Password</label>
                            <div className="invalid-feedback">Passwords do not match.</div>
                          </div>
                          <div className="mt-3">
                            <div className="btn-group">
                              <button type="button" className="btn btn-primary" onClick={handleNext}>
                                Next
                              </button>
                              <button type="button" className="btn btn-light" onClick={() => navigate('/login')}>
                                Login
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      {step === 2 && (
                        <>
                          <div className="form-floating">
                            <input 
                              type="text"
                              className={`form-control ${!isDisplayNameValid ? 'is-invalid' : ''}`}
                              id="displayName"
                              placeholder="Display Name"
                              value={displayName}
                              onChange={handleDisplayNameChange}
                              required
                            />
                            <label htmlFor="displayName">Display Name</label>
                            <div className="invalid-feedback">Please enter a display name.</div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Profile Photo</label>
                            <input 
                              type="file"
                              className="form-control"
                              id="photo"
                              onChange={handlePhotoChange}
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
                          <div className="mt-3">
                            <button type="button" className="btn btn-secondary" onClick={handleBack}>
                              Back
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Register
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthBox;
