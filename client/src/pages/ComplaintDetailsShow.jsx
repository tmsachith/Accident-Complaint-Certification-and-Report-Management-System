import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ComplaintDetails from '../components/ComplaintDetails';
import './ComplaintDetailsShow.css';

const ComplaintDetailsShow = () => {
  const { id } = useParams(); // Get the complaint ID from the URL

  return (
    <div className="complaint-details-show-page">
      
      <div className="complaint-details-show-main">
        <Sidebar />
        <ComplaintDetails complaintId={id} /> {/* Pass the complaint ID to ComplaintDetails */}
      </div>
    </div>
  );
};

export default ComplaintDetailsShow;