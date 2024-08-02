import React from 'react';
import './SupervisorAcci.css';

const SupervisorAccident = () => {
  const accidents = [
    { title: "Chemical Burn Incident", status: "Approved" },
    { title: "Fall from Height", status: "Line manager" },
    { title: "Electrical Hazards", status: "Approved" },
    { title: "Allergic Reaction", status: "Line manager" },
  ];

  const getStatusClass = (status) => {
    return status === "Approved" ? "approved" : "line-manager";
  };

  return (
    <div className="supervisor-accident">
      <button className="add-accident-button">Add Accident</button>
      <h2>Recent Accidents</h2>
      <div className="accident-list">
        {accidents.map((accident, index) => (
          <div className="accident-item" key={index}>
            <div className="accident-title">{accident.title}</div>
            <div className={`accident-status ${getStatusClass(accident.status)}`}>
              {accident.status}
              <span className={`status-dot ${getStatusClass(accident.status)}`}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupervisorAccident;
