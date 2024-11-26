import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './adduser.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    nic: '',
    position: '',
    department: '',
    phone: '',
    address: '',
    dob: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccess2, setShowSuccess2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const generatedPassword = generateRandomPassword();
    setFormData((prevData) => ({
      ...prevData,
      password: generatedPassword,
      cpassword: generatedPassword,
    }));
  }, []);

  const generateRandomPassword = () => {
    const length = 10;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseSuccess2 = () => {
    setShowSuccess2(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.username || !formData.email || !formData.password || !formData.cpassword ||
      !formData.nic || !formData.fullname || !formData.position || !formData.phone ||
      !formData.address || !formData.department || !formData.dob
    ) {
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
      setShowSuccess(true);
      await axios.post(import.meta.env.BASE_URL+'/api/auth/signup', formData);

      setError('');

      await axios.post(import.meta.env.BASE_URL+'/api/send-email', {
        to: formData.email,
        subject: 'Welcome to Our Service',
        text: `Hello ${formData.fullname},\n\nYour account has been created successfully!\nEmail: ${formData.email}\nPassword: ${formData.password}\n\nPlease keep this information secure.`
      });

      await axios.post(import.meta.env.BASE_URL+'/api/send-sms', {
        to: `+94754377125`, // Recipient's phone number
        message: `Hello ${formData.fullname}, your account has been created successfully!`
      });

      await axios.post(import.meta.env.BASE_URL+'/api/notifications', {
        type: 'Signup Notification',
        title: 'Added new user',
        description: `User ${formData.fullname}, Position: ${formData.position}, Department: ${formData.department}`
      });

      setShowSuccess2(true);
      setLoading(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="con">
    <div className="content1">
      <div className="text">Add User</div>
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-bar-filled"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
        </div>
        <div className="progress-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span>1</span>
            <div className="step-label">General Details</div>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span>2</span>
            <div className="step-label">Event Details</div>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <div className="step-label">Add User</div>
          </div>
        </div>
      </div>
      <TransitionGroup>
        <CSSTransition
          key={step}
          timeout={300}
          classNames="form-step"
        >
          <form onSubmit={handleSubmit} className="form-container">
            {step === 1 && (
              <div>
                <div className="field input-group">
                  <label htmlFor="username" className="label"></label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    className="input"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="field input-group">
                  <label htmlFor="fullname" className="label"></label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Full Name"
                    className="input"
                    required
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                </div>
                <div className="field input-group">
                  <label htmlFor="nic" className="label"></label>
                  <input
                    id="nic"
                    type="text"
                    placeholder="NIC Number"
                    className="input"
                    required
                    value={formData.nic}
                    onChange={handleChange}
                  />
                </div>
                <div className="field input-group">
                  <label htmlFor="position" className="label"></label>
                  <select
                    id="position"
                    className="input"
                    required
                    value={formData.position}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select Position</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Line Manager">Line Manager</option>
                    <option value="Branch Manager">Branch Manager</option>
                    <option value="QA">QA</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="button-container">
                  <button type="button" className="button next" onClick={handleNext}>
                    Next <i className="icon-next"></i>
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="field input-group">
                  <label htmlFor="department" className="label"></label>
                  <input
                    id="department"
                    type="text"
                    placeholder="Department"
                    className="input"
                    required
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="field input-group">
                  <label htmlFor="phone" className="label"></label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Phone Number"
                    className="input"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="field input-group">
                  <label htmlFor="address" className="label"></label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    className="input"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="field input-group">
                  <label htmlFor="dob" className="label"></label>
                  <input
                    id="dob"
                    type="date"
                    className="input"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div className="button-container">
                  <button type="button" className="button previous" onClick={handlePrev}>
                    <i className="icon-previous"></i> Previous
                  </button>
                  <button type="button" className="button next primary-next" onClick={handleNext}>
                    Next <i className="icon-next"></i>
                  </button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <div className="field input-group">
                  <label htmlFor="email" className="label"></label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="input"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="field input-group">
                  <label htmlFor="password" className="label"></label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="input"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span onClick={toggleShowPassword} className="toggle-password-icon">
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
                <div className="field input-group">
                  <label htmlFor="cpassword" className="label"></label>
                  <input
                    id="cpassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="input"
                    required
                    value={formData.cpassword}
                    onChange={handleChange}
                  />
                  <span onClick={toggleShowPassword} className="toggle-password-icon">
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
                <div className="button-container">
                  <button type="button" className="button previous" onClick={handlePrev}>
                    <i className="icon-previous"></i> Previous
                  </button>
                  <button type="submit" className="button primary-add" disabled={loading}>
                    {loading ? 'Loading...' : 'Add User'} <i className="icon-add-user"></i>
                  </button>
                </div>
              </div>
            )}
          </form>
        </CSSTransition>
      </TransitionGroup>
      {showSuccess && (
        <div className="success">
          <div className="success__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fillRule="evenodd" fill="#393a37" d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z" clipRule="evenodd"></path></svg>
          </div>
          <div className="success__title">Account Creating...</div>
          <div className="success__close" onClick={handleCloseSuccess}><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20"><path fill="#393A37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path></svg></div>
        </div>
      )}

      {showSuccess2 && (
        <div className="success">
          <div className="success__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fillRule="evenodd" fill="#393a37" d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z" clipRule="evenodd"></path></svg>
          </div>
          <div className="success__title">Signup successful!</div>
          <div className="success__close" onClick={handleCloseSuccess2}><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20"><path fill="#393A37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path></svg></div>
        </div>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
    </div>
  );
}