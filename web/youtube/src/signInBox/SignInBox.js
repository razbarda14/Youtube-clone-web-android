import './SignInBox.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import youtubeIcon from "../img/youtube-icon.png";


function SignInBox() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginValid, setIsLoginValid] = useState(true);

  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Validate login credentials
    const user = users.find(user => user.userName === userName && user.password === password);

    if (user) {
      alert('Login successful!');
    } else {
      setIsLoginValid(false);
    }
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle main-content">
      <div className="container">
        <div id="sign-in-register-card" className="card">
          <div className="card-body">
            <div className="container overflow-hidden text-center">
              <form noValidate onSubmit={handleSubmit}>

                <div className="row gy-5">

                  <div className="col-6">
                    <div className="p-3 text-start">
                      {/* Title and description */}
                      <h5 className="card-title">Sign In</h5>
                      <p className="card-text">To continue to YouTube</p>
                      <div className='col-8 d-flex align-items-center justify-content-center'>
                        <img src={youtubeIcon} alt="Clickable" height="80px" />
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="p-3">
                      {/* Form for user input */}
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
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="p-3">
                      {/* Placeholder div for alignment */}
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="p-3">
                      {/* Go to Register page button */}

                      <div className='row'>

                        <div className='col-6'>
                          <button type="button"
                            className="btn btn-light me-3"
                            onClick={() => navigate('/register')}>
                            Register
                          </button>
                        </div>

                        <div className='col-6'>
                          {/* Submit button */}
                          <button type="submit" className="btn btn-primary me-3">
                            Sign In
                          </button>
                        </div>



                      </div>



                    </div>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInBox;
