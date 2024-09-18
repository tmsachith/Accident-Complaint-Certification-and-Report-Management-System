import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import './SupervisorAcci.css';

const SupervisorAccident = () => {
  const [showApproved, setShowApproved] = useState(false);
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccidents = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/accidents');
        const data = await response.json();

        // Sort accidents by date in descending order
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAccidents(sortedData);
      } catch (error) {
        console.error('Error fetching accidents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccidents();

    // Fetch username and position from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPosition = localStorage.getItem('position');
    setUsername(storedUsername);
    setPosition(storedPosition);
  }, []);

  const handleShowApproved = () => setShowApproved(true);
  const handleShowLineManager = () => setShowApproved(false);

  const handleAddAccident = () => {
    window.open('/add-accident', '_blank');
  };

  const handleAccidentClick = (accident) => {
    window.open(`/accident-show/${accident._id}`, '_blank');
  };

  const renderAccidentList = (accidents) => {
    return accidents.map((accident, index) => (
      <div
        className={`accident-item ${accident.status === 'Approved' ? 'approved' : 'line-manager'}`}
        key={index}
        onClick={() => handleAccidentClick(accident)}
      >
        <div className="accident-info">
          {Array.isArray(accident.attachments) && accident.attachments.length > 0 && (
            <img
              src={accident.attachments[0]} 
              alt="Attachment"
              className="accident-image"
            />
          )}
          <div className="accident-details">
            <div className="accident-title">{accident.description}</div>
            <div className="accident-location-department">
              <FaMapMarkerAlt /> {accident.accidentLocation} | <FaUserTie /> {accident.department}
            </div>
          </div>
        </div>
        <div className="accident-status">
          {accident.status}
          <span className={`status-dot ${accident.status === 'Approved' ? 'approved' : 'line-manager'}`}></span>
        </div>
      </div>
    ));
  };

  const filteredAccidents = showApproved
  ? accidents.filter((accident) => accident.status === 'Approved')
  : position === 'Line Manager'
  ? accidents.filter((accident) => accident.status === 'Line Manager Review')
  : position === 'Branch Manager'
  ? accidents.filter((accident) => accident.status === 'Branch Manager Review')
  : position === 'QA'
  ? accidents.filter((accident) => accident.status === 'QA Review')
  : position === 'Supervisor'
  ? accidents.filter((accident) =>
      ['Line Manager Review', 'Branch Manager Review', 'QA Review'].includes(accident.status)
    )
  : accidents.filter((accident) => accident.status === 'Pending Review');

  return (
    <div className="supervisor-accident">
      {username && position && (
        <div className="user-info">
          <span>{username} ({position})!</span>
        </div>
      )}
      <button className="add-accident-button" onClick={handleAddAccident}>
        Add Accident
      </button>
      {/* <h2>Recent Accidents</h2> */}
      <div className="button-group">
        <button
          className={`toggle-button1 ${!showApproved ? 'active' : ''}`}
          onClick={handleShowLineManager}
        >
          Approval Proccessing
        </button>
        <button
          className={`toggle-button ${showApproved ? 'active' : ''}`}
          onClick={handleShowApproved}
        >
          Closed
        </button>
      </div>
      
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="accident-list">
          {renderAccidentList(filteredAccidents)}
        </div>
      )}
    </div>
  );
};

export default SupervisorAccident;