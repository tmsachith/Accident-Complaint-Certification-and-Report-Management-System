import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import close icon

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [nic, setNic] = useState('');
  const [showNicInput, setShowNicInput] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const response = await axios.post(import.meta.env.BASE_URL + '/api/auth/signin', {
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

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(import.meta.env.BASE_URL + '/api/auth/forgot-password', { nic });
      alert(response.data.message); // Display success message
      setShowNicInput(false); // Hide NIC popup after submitting the request
      setNic(''); // Reset nic field
    } catch (error) {
      alert(error.response?.data?.message || 'Error while processing request.');
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
          <div className="field password-field">
            <input
              required
              type={showPassword ? 'text' : 'password'}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">Password</label>
            <span 
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="forgot-pass">
            <a href="#" onClick={(e) => { e.preventDefault(); setShowNicInput(true); }}>
              Forgot Password?
            </a>
          </div>
          <button className="button" disabled={loading}>
            {loading ? 'Loading...' : <span>Sign in &#10149;</span>}
          </button>
        </form>

        {showNicInput && (
          <div className="nic-popup">
            <div className="nic-popup-content">
              <span 
                className="close-popup"
                onClick={() => setShowNicInput(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <h3 className="popup-title">Reset Password</h3>
              <input
                type="email"
                className="email-input"
                placeholder="Enter your Email"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
              <div className="nic-popup-actions">
                <button className="reset-button" onClick={handleForgotPassword}>Reset</button>
                {/* <button className="cancel-button" onClick={() => setShowNicInput(false)}>Cancel</button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}