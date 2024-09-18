import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUserTie, FaFileAlt, FaClock, FaComments, FaIdBadge, FaUserCheck } from 'react-icons/fa';
import './Accident_details.css';

const AccidentDetails = ({ accidentId }) => {
  const [accident, setAccident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchAccidentDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/accidents/${accidentId}`);
        const data = await response.json();
        setAccident(data);
      } catch (error) {
        console.error('Error fetching accident details:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAccidentDetails();
  }, [accidentId]);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (!accident) {
    return <div className="error">Accident not found</div>;
  }

  return (
    <div className="accident-details-container">
      <h2>Accident Details</h2>

      <div className="section">
        <h3>Employee Details</h3>
        <div className="info-row">
          <p><strong><FaIdBadge /> Employee ID:</strong> {accident.employeeId}</p>
          <p><strong><FaUserTie /> Name:</strong> {accident.employeeName}</p>
          <p><strong>Department:</strong> {accident.department}</p>
          <p><strong>Position:</strong> {accident.position}</p>
        </div>
      </div>

      <div className="section">
        <h3>Accident Details</h3>
        <div className="info-row">
          <p><strong><FaMapMarkerAlt /> Location:</strong> {accident.accidentLocation}</p>
          <p><strong><FaFileAlt /> Description:</strong> {accident.description}</p>
        </div>
        <div className="info-row">
          <p><strong><FaClock /> Accident Date:</strong> {new Date(accident.accidentDate).toLocaleDateString()}</p>
          <p><strong><FaClock /> Accident Time:</strong> {accident.accidentTime}</p>
        </div>
      </div>

      <div className="section">
        <h3>Review Details</h3>
        <div className="info-row">
          <p><strong><FaComments /> Supervisor Comments:</strong> {accident.supervisorComments}</p>
          <p><strong><FaUserCheck /> Line Manager Comments:</strong> {accident.lineManagerComments}</p>
          <p><strong><FaUserCheck /> Factory Manager Comments:</strong> {accident.factoryManagerComments}</p>
          <p><strong><FaUserCheck /> QA Comments:</strong> {accident.qaComments}</p>
          <p><strong><FaComments /> Final Comments:</strong> {accident.finalComments}</p>
          <p><strong>Status:</strong> {accident.status}</p>
          <p><strong>Notify Management:</strong> {accident.notifyManagement ? 'Yes' : 'No'}</p>
          <p><strong>Additional Notes:</strong> {accident.additionalNotes}</p>
        </div>
      </div>

      {accident.attachments && accident.attachments.length > 0 && (
        <div className="section">
          <h3>Attachments</h3>
          <div className="attachments-grid">
            {accident.attachments.map((attachment, index) => (
              <img
                key={index}
                src={attachment}
                alt={`Attachment ${index + 1}`}
                className="attachment-image"
                onClick={() => openImageModal(attachment)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="modal" onClick={closeImageModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={selectedImage} alt="Enlarged attachment" />
        </div>
      )}
    </div>
  );
};

export default AccidentDetails;