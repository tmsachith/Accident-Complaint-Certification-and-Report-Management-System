import React from 'react';
import Sidebar from '../components/Sidebar'; // Make sure this path is correct
import AccidentReportForm from '../components/AccidentReportForm'; // Adjust path as needed
import './AddAccident.css'; // Make sure the CSS file exists and has no syntax errors

const AddAccident = () => {
  return (
    <div className="addacci">
      <div className="addacci-main">
        <Sidebar /> {/* Ensure Sidebar component is exported correctly */}
        <div className="form-container">
          <AccidentReportForm /> {/* Ensure AccidentReportForm component is exported correctly */}
        </div>
      </div>
    </div>
  );
};

export default AddAccident;
