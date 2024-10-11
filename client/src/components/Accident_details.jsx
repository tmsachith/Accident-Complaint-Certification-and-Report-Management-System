import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUserTie, FaFileAlt, FaClock, FaComments, FaIdBadge } from 'react-icons/fa';
import './Accident_details.css';

const AccidentDetails = ({ accidentId }) => {
  const [accident, setAccident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment, setComment] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

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

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleSubmitComment = async () => {
    let updatedStatus = accident.status;
    if (accident.status === 'Line Manager Review') {
      updatedStatus = 'Branch Manager Review';
    } else if (accident.status === 'Branch Manager Review') {
      updatedStatus = 'QA Review';
    } else if (accident.status === 'QA Review') {
      updatedStatus = 'Approved';
    }

    try {
      const response = await fetch(`/api/accidents/${accidentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment,
          status: updatedStatus,
        }),
      });

      if (response.ok) {
        const updatedAccident = await response.json();
        setAccident(updatedAccident);
        setComment('');
        setAlertMessage({ type: 'success', text: 'Update successful!' });
      } else {
        setAlertMessage({ type: 'error', text: 'Failed to update accident' });
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      setAlertMessage({ type: 'error', text: 'Error updating comment' });
    }
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

      {alertMessage && (
        <div className={`alert ${alertMessage.type}`}>
          {alertMessage.text}
        </div>
      )}

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
        <div className="info-row">
          <p><strong>Injury Type:</strong> {accident.injuryType}</p>
          <p><strong>Severity:</strong> {accident.severity}</p>
          <p><strong>Body Part Affected:</strong> {accident.bodyPartAffected}</p>
          <p><strong>Actions Taken:</strong> {accident.actionsTaken}</p>
          <p><strong>Reported To:</strong> {accident.reportedTo}</p>
          <p><strong>Witnesses:</strong> {accident.witnesses}</p>
          <p><strong>Witness Contact:</strong> {accident.witnessContact}</p>
        </div>
      </div>

      <div className="status-card">
        <p><strong>Status:</strong> {accident.status}</p>
      </div>

      <div className="section">
        <h3>Review Details</h3>
        {(accident.status === 'Line Manager Review' ||
          accident.status === 'Branch Manager Review' ||
          accident.status === 'QA Review') && (
          <div className="review-card">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder={`Enter ${accident.status.split(' ')[0]} Comment`}
            />
            <button onClick={handleSubmitComment}>Submit</button>
          </div>
        )}
        <div className="review-card">
          <p><strong><FaComments /> Supervisor Comments:</strong> {accident.supervisorComments}</p>
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
                onClick={() => setSelectedImage(attachment)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <span className="close">&times;</span>
          <img className="modal-content" src={selectedImage} alt="Enlarged attachment" />
        </div>
      )}
    </div>
  );
};

export default AccidentDetails;