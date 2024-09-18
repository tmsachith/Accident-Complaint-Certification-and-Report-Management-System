import React, { useState } from 'react';
import axios from 'axios';
import './UserSettings.css';

const UserSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [email, setEmail] = useState(''); // Assuming user email is available

  const handleCurrentPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/verify-password', { email, currentPassword });
      if (response.status === 200) {
        setShowNewPasswordFields(true); // Show new password fields if current password is valid
      }
    } catch (error) {
      alert('Current password is incorrect');
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New passwords don't match");
      return;
    }

    try {
      const response = await axios.post('/api/auth/change-password', { email, newPassword });
      if (response.status === 200) {
        alert('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowNewPasswordFields(false);
      }
    } catch (error) {
      alert('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="user-settings">
      <h2>Change Password</h2>

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
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
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
