import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css'; // Ensure you have this CSS file

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.cpassword) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.cpassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setLoading(false);
      setError('');
      navigate('/sign-in'); // Redirect to sign-in page on successful signup
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="content">
      <div className="text">Create Account</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="field">
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="input"
            required
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="input"
            required
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="input"
            required
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            id="cpassword"
            type="password"
            placeholder="Confirm Password"
            className="input"
            required
            onChange={handleChange}
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button
          disabled={loading}
          className="button"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className="sign-up">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="sign-in-link">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
