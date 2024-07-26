import React from 'react';
import './DashboardContent.css';

const DashboardContent = () => {
  const cardData = [
    { title: "Complaints", description: "" },
    { title: "Accidents", description: "" },
    { title: "Certificate Changes", description: "" },
    { title: "Quick Meetings", description: "" },
    { title: "Reports", description: "" },
    
  ];

  return (
    <div className="dashboard-content">
      {cardData.map((card, index) => (
        <div className="card5" key={index}>
          <div className="card5-content">
            <span>{card.title}</span>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardContent;
