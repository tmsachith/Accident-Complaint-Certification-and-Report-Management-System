import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCertificate, faFileAlt, faUserPlus, faPersonFallingBurst, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './DashboardContent.css';

const DashboardContent = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [position, setPosition] = useState(null);
  const [pendingCertificateCount, setPendingCertificateCount] = useState(0);
  const [approvalAccidentCount, setApprovalAccidentCount] = useState(0);
  const [pendingcomplaintCount, setPendingcomplaintCount] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPosition = localStorage.getItem('position');
    setUsername(storedUsername);
    setPosition(storedPosition);
  }, []);

  const handleCardNavigation = (route) => {
    navigate(route);
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotifications(sortedNotifications.slice(0, 5));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificateChanges = async () => {
    try {
      const response = await axios.get('/api/certificate-changes');
      const changes = response.data;

      const pendingChanges = changes.filter(change => change.status === 'Pending Review');
      setPendingCertificateCount(pendingChanges.length);
    } catch (error) {
      console.error('Error fetching certificate changes:', error);
    }
  };

  const fetchcomplaint = async () => {
    try {
      const response = await axios.get('/api/complaints');
      const complaints = response.data;

      const pendingcomplaint = complaints.filter(change => change.status === 'Pending');
      setPendingcomplaintCount(pendingcomplaint.length);
    } catch (error) {
      console.error('Error fetching complaint:', error);
    }
  };

  const fetchAccidents = async () => {
    try {
      const response = await axios.get('/api/accidents');
      const accidents = response.data;

      const approvalAccidents = accidents.filter(accident => {
        return (
          position === 'Admin' ? ['Line Manager Review', 'Branch Manager Review', 'QA Review'].includes(accident.status) :
          position === 'Line Manager' ? accident.status === 'Line Manager Review' :
          position === 'Branch Manager' ? accident.status === 'Branch Manager Review' :
          position === 'QA' ? accident.status === 'QA Review' :
          position === 'Supervisor' ? ['Line Manager Review', 'Branch Manager Review', 'QA Review'].includes(accident.status) :
          accident.status === 'Pending Review'
        );
      });

      setApprovalAccidentCount(approvalAccidents.length);
    } catch (error) {
      console.error('Error fetching accidents:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchCertificateChanges();
    fetchAccidents();
    fetchcomplaint();
  }, [position]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const cardData = [
    { title: "Complaints", route: "/complaints", notificationCount: pendingcomplaintCount, icon: faExclamationTriangle },
    { title: "Accidents", route: "/accidents", notificationCount: approvalAccidentCount, icon: faPersonFallingBurst },
    { title: "Certificate Changes", route: "/certificate-changes", notificationCount: pendingCertificateCount, icon: faCertificate },
    { title: "Reports", route: "/report", notificationCount: '', icon: faFileAlt },
    { title: "Add User", route: "/sign-up", notificationCount: '', icon: faUserPlus },
    { title: "Announcements", route: "/announcements", notificationCount: '', icon: faBell }
  ];
  
  const filteredCardData = cardData.filter(card => {
    if (position === 'Supervisor' || position === 'Line Manager') {
      return card.title === "Accidents" && card.title !== "Announcements";
    }
    if (position === 'Branch Manager') {
      return card.title !== "Complaints" && card.title !== "Add User" && card.title !== "Announcements";
    }
    if (position === 'QA') {
      return card.title !== "Add User";
    }
    return true;
  });

  const timeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 60000);

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} minute${diff > 1 ? 's' : ''} ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hour${Math.floor(diff / 60) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diff / 1440)} day${Math.floor(diff / 1440) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="dashboard-content">
      <div className="timer">
        {currentTime.toLocaleTimeString()}
      </div>
      {filteredCardData.map((card, index) => (
        <div
          className="card5"
          key={index}
          role="button"
          tabIndex={0}
          onClick={() => handleCardNavigation(card.route)}
          onKeyDown={(e) => e.key === 'Enter' && handleCardNavigation(card.route)}
        >
          {card.notificationCount && card.notificationCount > 0 && (
            <div className="notification-badge">
              <span>{card.notificationCount}</span>
            </div>
          )}
          <div className="card5-content">
            <FontAwesomeIcon icon={card.icon} size="3x" />
            <span>{card.title}</span>
          </div>
        </div>
      ))}
      <div className="notifications-list">
        <h2>Recent Notifications</h2>
        {loading ? (
          <div className="loading-spinner"></div>
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