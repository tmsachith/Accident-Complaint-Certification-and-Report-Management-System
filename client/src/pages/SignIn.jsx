import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure
} from '../redux/user/userSlice';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password,
      });

      const { username, position, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('position', position);
      localStorage.setItem('email', email);

      dispatch(signInSuccess(response.data));
      navigate('/dashboard', { state: { username, position } });
    } catch (error) {
      dispatch(signInFailure(error.response?.data?.message || 'Login failed. Please try again.'));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="sign-in-container">
      <div className={`alertsign ${showAlert ? 'show' : ''}`}>{error}</div>
      <div className="shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
      </div>
      <div className="content">
        <div className="text">Sign In</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              required
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label">Email</label>
          </div>
          <div className="field">
            <input
              required
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">Password</label>
          </div>
          <div className="forgot-pass">
            <a href="#">Forgot Password?</a>
          </div>
          <button className="button" disabled={loading}>
            {loading ? 'Loading...' : <span>Sign in &#10149;</span>}
          </button>
        </form>
      </div>
    </div>
  );
}