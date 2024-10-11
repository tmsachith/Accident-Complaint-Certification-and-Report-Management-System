import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Announcement from '../components/Announcement';
import './AnnouncementPage.css';

const AnnouncementPage = () => {
  return (
    <div className="announcement-page">
      
      <div className="announcement-main">
        <Sidebar />
        <Announcement />
      </div>
    </div>
  );
};

export default AnnouncementPage;