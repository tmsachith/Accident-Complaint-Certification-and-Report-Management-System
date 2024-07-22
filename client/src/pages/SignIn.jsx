import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css'; // Ensure you have this CSS file

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password
      });

      // Assuming the response contains the user data and token
      const { username, token } = response.data;

      // Save the token in local storage (or any other storage)
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      // Redirect to the home page with the username
      navigate('/dashboard', { state: { username } });
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
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
  );
}
