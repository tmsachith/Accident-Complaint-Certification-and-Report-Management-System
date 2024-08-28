import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCarCrash, faCertificate, faFileAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './DashboardContent.css';

const DashboardContent = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true); // Add loading state
  const [username, setUsername] = useState(null); // Add state for username

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  const handleCardNavigation = (route) => {
    navigate(route);
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications'); // Adjust the endpoint as needed
      const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotifications(sortedNotifications.slice(0, 5));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const cardData = [
    { title: "Complaints", route: "/complaints", notificationCount: 5, icon: faExclamationTriangle },
    { title: "Accidents", route: "/accidents", notificationCount: 2, icon: faCarCrash },
    { title: "Certificate Changes", route: "/certificate-changes", notificationCount: 1, icon: faCertificate },
    { title: "Reports", route: "/reports", notificationCount: '', icon: faFileAlt },
    { title: "Add User", route: "/sign-up", notificationCount: '', icon: faUserPlus },
  ];

  const timeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 60000); // Difference in minutes

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} minute${diff > 1 ? 's' : ''} ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hour${Math.floor(diff / 60) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diff / 1440)} day${Math.floor(diff / 1440) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="dashboard-content">
      <div className="timer">
        {currentTime.toLocaleTimeString()} {/* Display current time */}
      </div>
      {username && (
        <div className="welcome-message">
          <span role="img" aria-label="wave">👋</span> Welcome, {username}!
        </div>
      )}
      {cardData.map((card, index) => (
        <div
          className="card5"
          key={index}
          role="button"
          tabIndex={0}
          onClick={() => handleCardNavigation(card.route)}
          onKeyDown={(e) => e.key === 'Enter' && handleCardNavigation(card.route)}
        >
          <div className="notification-badge">
            {card.notificationCount > 0 && <span>{card.notificationCount}</span>}
          </div>
          <div className="card5-content">
            <FontAwesomeIcon icon={card.icon} size="3x" />
            <span>{card.title}</span>
          </div>
        </div>
      ))}
      <div className="notifications-list">
        <h2>Recent Notifications</h2>
        {loading ? (
          <div className="loading-spinner"></div> // Show loading spinner while loading
        ) : (
          notifications.length === 0 ? (
            <p>No notifications available</p>
          ) : (
            notifications.map(notification => (
              <div key={notification._id} className="notification-item" onClick={handleNotificationClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleNotificationClick()}>
                <h3>{notification.title}</h3>
                <p>{timeAgo(notification.createdAt)}</p>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
