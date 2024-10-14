import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUserTie, FaFileAlt, FaClock, FaIdBadge } from 'react-icons/fa';
import './Accident_details.css';

const AccidentDetails = ({ accidentId }) => {
  const [accident, setAccident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment, setComment] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [userPosition, setUserPosition] = useState('');

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

    const position = localStorage.getItem('position');
    setUserPosition(position);

    fetchAccidentDetails();
  }, [accidentId]);

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

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
        setAlertMessage({ type: 'success', text: 'Update successful!' });
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Refresh page after 2 seconds
      } else {
        setAlertMessage({ type: 'error', text: 'Failed to update accident' });
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      setAlertMessage({ type: 'error', text: 'Error updating comment' });
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!accident) {
    return <div className="error">Accident not found</div>;
  }

  const canSubmitComment = () => {
    const { status } = accident;
    return (
      (status === 'Line Manager Review' && userPosition === 'Line Manager') ||
      (status === 'Branch Manager Review' && userPosition === 'Branch Manager') ||
      (status === 'QA Review' && userPosition === 'QA')
    );
  };

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
        {canSubmitComment() && (
          <div className="review-card">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder={`Enter ${accident.status.split(' ')[0]} Comment`}
            />
            <button onClick={handleSubmitComment} disabled={!comment.trim()}>
              Submit
            </button>
          </div>
        )}

        {accident.qaComments && (
          <div className="comment-card">
            <h4>QA Comments:</h4>
            <p>{accident.qaComments}</p>
          </div>
        )}
        {accident.branchManagerComments && (
          <div className="comment-card">
            <h4>Branch Manager Comments:</h4>
            <p>{accident.branchManagerComments}</p>
          </div>
        )}
        {accident.lineManagerComments && (
          <div className="comment-card">
            <h4>Line Manager Comments:</h4>
            <p>{accident.lineManagerComments}</p>
          </div>
        )}
        <div className="comment-card">
          <h4>Supervisor Comments:</h4>
          <p>{accident.supervisorComments}</p>
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