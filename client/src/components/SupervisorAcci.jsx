import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SupervisorAcci.css';

const SupervisorAccident = () => {
  const [showApproved, setShowApproved] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const accidents = [
    { title: "Chemical Burn Incident", status: "Approved" },
    { title: "Fall from Height", status: "Line manager" },
    { title: "Electrical Hazards", status: "Approved" },
    { title: "Allergic Reaction", status: "Line manager" },
  ];

  const handleShowApproved = () => setShowApproved(true);
  const handleShowLineManager = () => setShowApproved(false);
  
  const handleAddAccident = () => {
    navigate('/add-accident'); // Navigate to the /add-accident route
  };

  return (
    <div className="supervisor-accident">
      <button className="add-accident-button" onClick={handleAddAccident}>
        Add Accident
      </button>
      <h2>Recent Accidents</h2>
      <div className="button-group">
        <button
          className={`toggle-button ${showApproved ? 'active' : ''}`}
          onClick={handleShowApproved}
        >
          Approved
        </button>
        <button
          className={`toggle-button ${!showApproved ? 'active' : ''}`}
          onClick={handleShowLineManager}
        >
          Not Approved
        </button>
      </div>
      <div className="accident-list">
        {showApproved
          ? accidents
              .filter(accident => accident.status === "Approved")
              .map((accident, index) => (
                <div className="accident-item approved" key={index}>
                  <div className="accident-title">{accident.title}</div>
                  <div className="accident-status">
                    {accident.status}
                    <span className="status-dot approved"></span>
                  </div>
                </div>
              ))
          : accidents
              .filter(accident => accident.status === "Line manager")
              .map((accident, index) => (
                <div className="accident-item line-manager" key={index}>
                  <div className="accident-title">{accident.title}</div>
                  <div className="accident-status">
                    {accident.status}
                    <span className="status-dot line-manager"></span>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
};

export default SupervisorAccident;
