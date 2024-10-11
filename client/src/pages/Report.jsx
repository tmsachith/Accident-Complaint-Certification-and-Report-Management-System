import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ReportContent from '../components/ReportContent'; // Assuming you have this component
import './Report.css';

const Report = () => {
  return (
    <div className="report">
      <Header />
      <div className="report-main">
        <Sidebar />
        <div className="report-content">
          <ReportContent />
        </div>
      </div>
    </div>
  );
};

export default Report;