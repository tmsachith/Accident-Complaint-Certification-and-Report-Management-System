import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaCog, FaBell, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/sign-in');
  };

  return (
    <nav className="sidebar">
      <ul>
        <li onClick={() => navigate('/dashboard')}>
          <FaTachometerAlt className="icon" /> Dashboard
        </li>
        <li onClick={() => navigate('/settings')}>
          <FaCog className="icon" /> Settings
        </li>
        <li onClick={() => navigate('/notifications')}>
          <FaBell className="icon" /> Notifications
        </li>
      </ul>
      <ul className="logout">
        <li onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Logout
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;