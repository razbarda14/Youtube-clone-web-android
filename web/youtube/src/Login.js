import React, { useState } from 'react';
import './AuthBox.css';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginValid, setIsLoginValid] = useState(true);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Validate login credentials
    if (userData && userData.userName === userName && userData.password === password) {
      alert('Login successful!');
    } else {
      setIsLoginValid(false);
    }
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
                    {/* Title and description */}
                    <h5 className="card-title">Login</h5>
                    <p className="card-text">To continue to YouTube</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3">
                    {/* Form for user input */}
                    <form noValidate onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        {/* Username input */}
                        <input 
                          type="text"
                          className={`form-control ${!isLoginValid ? 'is-invalid' : ''}`}
                          id="userName"
                          placeholder="Username"
                          value={userName} // Link with userName state
                          onChange={handleUserNameChange} // Call handleUserNameChange on change 
                          required
                        />
                        <label htmlFor="userName">Username</label>
                      </div>
                      <div className="form-floating mb-3">
                        {/* Password input */}
                        <input 
                          type="password"
                          className={`form-control ${!isLoginValid ? 'is-invalid' : ''}`}
                          id="password"
                          placeholder="Password"
                          value={password} // Link with password state
                          onChange={handlePasswordChange} // Call handlePasswordChange on change
                          required
                        />
                        <label htmlFor="password">Password</label>
                        <div className="invalid-feedback">Invalid username or password.</div>
                      </div>
                      {/* Submit button */}
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </form>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <script src="script.js"></script> */}
    </div>
  );
}

export default Login;
