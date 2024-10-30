import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserSettings.css';

const UserSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number.';
    }
    return '';
  };

  const handleCurrentPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/verify-password', { email, currentPassword });
      if (response.status === 200) {
        setShowNewPasswordFields(true);
        setAlert('');
      }
    } catch (error) {
      setAlert('Current password is incorrect');
    }
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordError(validatePassword(password));
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      setAlert(passwordError);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setAlert("New passwords don't match");
      return;
    }

    try {
      const response = await axios.post('/api/auth/change-password', { email, newPassword });
      if (response.status === 200) {
        setAlert('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowNewPasswordFields(false);
      }
    } catch (error) {
      setAlert('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="user-settings">
      <h2>Change Password</h2>

      {alert && <div className="alert">{alert}</div>}

      {!showNewPasswordFields && (
        <form className="settings-form" onSubmit={handleCurrentPasswordSubmit}>
          <div className="form-group">
            <label htmlFor="current-password">Current Password:</label>
            <input
              type="password"
              id="current-password"
              name="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
            />
          </div>
          <button type="submit" className="save-button">Request Change Password</button>
        </form>
      )}

      {showNewPasswordFields && (
        <form className="settings-form" onSubmit={handleNewPasswordSubmit}>
          <div className="form-group">
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Enter your new password"
            />
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirm-new-password">Confirm New Password:</label>
            <input
              type="password"
              id="confirm-new-password"
              name="confirm-new-password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>
          <button type="submit" className="save-button">Change Password</button>
        </form>
      )}
    </div>
  );
};

export default UserSettings;