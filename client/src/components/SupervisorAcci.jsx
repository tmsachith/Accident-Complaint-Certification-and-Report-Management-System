import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserTie, FaFileAlt, FaClock, FaComments } from 'react-icons/fa';
import './SupervisorAcci.css';

const SupervisorAccident = () => {
  const [showApproved, setShowApproved] = useState(false); // Default to showing not approved
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccident, setSelectedAccident] = useState(null); // State for selected accident
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccidents = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/accidents');
        const data = await response.json();
        setAccidents(data);
      } catch (error) {
        console.error('Error fetching accidents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccidents();
  }, []);

  const handleShowApproved = () => setShowApproved(true);
  const handleShowLineManager = () => setShowApproved(false);

  const handleAddAccident = () => {
    navigate('/add-accident');
  };

  const handleAccidentClick = (accident) => {
    setSelectedAccident(accident);
  };

  const handleClosePopup = () => {
    setSelectedAccident(null);
  };

  const renderAccidentList = (accidents) => {
    return accidents.map((accident, index) => (
      <div
        className={`accident-item ${accident.status === 'Approved' ? 'approved' : 'line-manager'}`}
        key={index}
        onClick={() => handleAccidentClick(accident)} // Make accident item clickable
      >
        <div className="accident-info">
          {Array.isArray(accident.attachments) && accident.attachments.length > 0 && (
            <img
              src={accident.attachments[0]} // Assuming attachments contain URLs
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

  return (
    <div className="supervisor-accident">
      <button className="add-accident-button" onClick={handleAddAccident}>
        Add Accident
      </button>
      <h2>Recent Accidents</h2>
      <div className="button-group">
        <button
          className={`toggle-button ${!showApproved ? 'active' : ''}`}
          onClick={handleShowLineManager}
        >
          Not Approved
        </button>
        <button
          className={`toggle-button ${showApproved ? 'active' : ''}`}
          onClick={handleShowApproved}
        >
          Approved
        </button>
      </div>
      
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="accident-list">
          {showApproved
            ? renderAccidentList(accidents.filter((accident) => accident.status === 'Approved'))
            : renderAccidentList(accidents.filter((accident) => accident.status === 'Pending Review'))
          }
        </div>
      )}

      {/* Popup for detailed accident view */}
      {selectedAccident && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <h2>{selectedAccident.description}</h2>
            <div className="popup-details">
              <p><strong><FaMapMarkerAlt /> Location:</strong> {selectedAccident.accidentLocation}</p>
              <p><strong><FaUserTie /> Department:</strong> {selectedAccident.department}</p>
              <p><strong><FaFileAlt /> Description:</strong> {selectedAccident.description}</p>
              <p><strong><FaClock /> Accident Date:</strong> {new Date(selectedAccident.accidentDate).toLocaleDateString()}</p>
              <p><strong><FaClock /> Accident Time:</strong> {selectedAccident.accidentTime}</p>
              <p><strong><FaComments /> Supervisor Comments:</strong> {selectedAccident.supervisorComments}</p>
              <p><strong>Status:</strong> {selectedAccident.status}</p>
              <p><strong>Notify Management:</strong> {selectedAccident.notifyManagement ? 'Yes' : 'No'}</p>
              <p><strong>Additional Notes:</strong> {selectedAccident.additionalNotes}</p>
              {selectedAccident.attachments && selectedAccident.attachments.length > 0 && (
                <div className="attachments-section">
                  <h3>Attachments:</h3>
                  <div className="attachments-grid">
                    {selectedAccident.attachments.map((attachment, index) => (
                      <img key={index} src={attachment} alt={`Attachment ${index + 1}`} className="attachment-image" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupervisorAccident;
