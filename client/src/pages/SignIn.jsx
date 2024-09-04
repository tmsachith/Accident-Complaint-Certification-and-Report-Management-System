import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css'; // Ensure you have this CSS file

import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure
} from '../redux/user/userSlice';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state) => state.user); // Get loading and error state from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart()); // Start the sign-in process (sets loading to true)

    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password,
      });

      // Assuming the response contains the user data and token
      const { username, position, token } = response.data;

      // Save the token, username, and position in local storage (or any other storage)
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('position', position);

      dispatch(signInSuccess(response.data)); // Dispatch success with the user data

      // Redirect to the dashboard page with the username and position
      navigate('/dashboard', { state: { username, position } });
    } catch (error) {
      dispatch(signInFailure(error.response?.data?.message || 'Login failed. Please try again.')); // Dispatch failure with the error message
    }
  };

  return (
    <div className="sign-in-container">
      <div className="content">
        <div className="text">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              required
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="span">
              {/* Add any icon or text here if needed */}
            </span>
            <label className="label">Email or Phone</label>
          </div>
          <div className="field">
            <input
              required
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="span">
              {/* Add any icon or text here if needed */}
            </span>
            <label className="label">Password</label>
          </div>
          <div className="forgot-pass">
            <a href="#">Forgot Password?</a>
          </div>
          <button className="button" disabled={loading}>
            {loading ? 'Loading...' : 'Sign in'}
          </button>
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
}
