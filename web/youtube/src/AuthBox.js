
import React, { useState } from 'react';
import './AuthBox.css';

function AuthBox() {
  return (
    <div class="position-absolute top-50 start-50 translate-middle">
      <div className='container'>
        <div className="card">
          <div className="card-body">
            <div class="container overflow-hidden text-center">
              <div class="row gy-5">
                <div class="col-6">
                  <div class="p-3 text-start">
                    <h5 className="card-title">Sign in</h5>
                    <p className="card-text">to continue to youtube</p>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-3">
                    <div class="form-floating mb-3">
                      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                      <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                      <label for="floatingPassword">Password</label>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-3">
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-3">
                    <button type="button" class="btn btn-light me-5">Sign up</button>
                    <button type="button" class="btn btn-primary">Login</button>
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