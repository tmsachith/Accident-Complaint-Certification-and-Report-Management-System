import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UserSettings from '../components/UserSettings';
import './Settings.css';

const Settings = () => {
  return (
    <div className="settings">
      
      <div className="settings-main">
        <Sidebar />
        <div className="settings-content">
          <UserSettings />
        </div>
      </div>
    </div>
  );
};

export default Settings;
