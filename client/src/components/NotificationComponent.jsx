import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NotificationComponent.css';
import { useLocation } from 'react-router-dom';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleStartLoading = () => {
      setLoading(true);
      setError(null);
    };

    const handleStopLoading = () => {
      setLoading(false);
    };

    handleStartLoading();
    const loadingTimeout = setTimeout(handleStopLoading, 1190);

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        const sortedNotifications = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to load notifications. Please try again later.');
      }
    };

    fetchNotifications();

    return () => clearTimeout(loadingTimeout);
  }, [location]);

  return (
    <div className="notifications-container">
      <h1 className='g11'>Notifications List</h1>
      {loading ? (
        <div className="dot-spinner">
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
        </div>
      ) : error ? (
        <div className="error">
          <div className="error__icon">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                fill="#fff"
              ></path>
            </svg>
          </div>
          <div className="error__title">{error}</div>
          <div className="error__close" onClick={() => setError(null)}>
            <svg
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </div>
      ) : (
        <ul>
          {notifications.map(notification => (
            <li key={notification._id} className="cardnotifi">
              <div className="containernotifi">
                <div className="leftnotifi">
                  <div className="status-indnotifi"></div>
                </div>
                <div className="rightnotifi">
                  <div className="text-wrapnotifi">
                    <h2>{notification.title}</h2> {/* Display title */}
                    <p>{notification.description}</p> {/* Display description */}
                    <p><strong>Unique ID:</strong> {notification.uniqueId}</p>
                    <p><strong>Created At:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="button-wrapnotifi">
                    <button className="primary-ctanotifi">View file</button>
                    <button className="secondary-ctanotifi">Mark as read</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationComponent;
