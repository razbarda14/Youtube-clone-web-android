import React, { useState } from 'react';
import './AuthBox.css';

function AuthBoxTry() {
  const [userNsme, setUserName] = useState('');
  const [isUserNameValid, setIsUserNameValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setIsUserNameValid(false);
    } else {
      setIsUserNameValid(true);
      // Your submission logic here
    }
  };

  return (
    <form className={`row g-3 needs-validationUserName ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
      <div className="col-md-4">
        <label htmlFor="validationCustom01" className="form-label">First name</label>
        <input
          type="text"
          className="form-control"
          id="validationCustom01"
          value={userNsme}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <div className="valid-feedback">
          Looks good!
        </div>
        <div className="invalid-feedback">
          Please provide a valid first name.
        </div>
      </div>
      <div className="col-12">
        <button className="btn btn-primary" type="submit">Submit form</button>
      </div>
    </form>
  );
}

export default AuthBoxTry;
