import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Complaintcomp from '../components/ComplaintCompo';
import './Complaints.css';

const Complaints = () => {
  return (
    <div className="complaints">
    
      <div className="complaints-main">
        <Sidebar />
        <Complaintcomp />
      </div>
    </div>
  );
};

export default Complaints;