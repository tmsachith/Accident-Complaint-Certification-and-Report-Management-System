import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCarCrash, faCertificate, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './DashboardContent.css';

const DashboardContent = () => {
  const navigate = useNavigate();

  const handleCardNavigation = (route) => {
    navigate(route);
  };

  const cardData = [
    { title: "Complaints", route: "/complaints", notificationCount: 5, icon: faExclamationTriangle },
    { title: "Accidents", route: "/accidents", notificationCount: 2, icon: faCarCrash },
    { title: "Certificate Changes", route: "/certificate-changes", notificationCount: 1, icon: faCertificate },
    { title: "Reports", route: "/reports", notificationCount: 3, icon: faFileAlt },
  ];

  return (
    <div className="dashboard-content">
      {cardData.map((card, index) => (
        <div
          className="card5"
          key={index}
          onClick={() => handleCardNavigation(card.route)}
        >
          <div className="notification-badge">
            {card.notificationCount > 0 && <span>{card.notificationCount}</span>}
          </div>
          <div className="card5-content">
            <FontAwesomeIcon icon={card.icon} size="3x" />
            <span>{card.title}</span>
            <p>{card.description || ''}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardContent;
