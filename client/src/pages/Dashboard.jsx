import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Make sure to create this CSS file

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/sign-in');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {username}!</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="dashboard-content">
        <p>This is your dashboard. You can add more components and content here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
