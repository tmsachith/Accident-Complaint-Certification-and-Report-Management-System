import React from 'react';
import Sidebar from '../components/Sidebar';
import NotificationComponent from '../components/NotificationComponent';
import './NotificationPage.css';

const NotificationPage = () => {
  return (
    <div className="notification-page">
      <div className="notification-page-main">
        <Sidebar />
        <NotificationComponent />
      </div>
    </div>
  );
};

export default NotificationPage;
