import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaTimes, FaUser, FaBuilding, FaBarcode, FaWarehouse, FaMedkit, FaCommentDots, FaSave, FaPlus } from 'react-icons/fa';
import './ComplaintCompo.css';

const ComplaintCompo = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [reviewerNote, setReviewerNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('/api/complaints');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
    setReviewerNote(complaint.reviewerNote || '');
  };

  const handleClosePopup = () => {
    setSelectedComplaint(null);
  };

  const handleSaveNote = async () => {
    if (selectedComplaint) {
      try {
        await axios.post('/api/complaints/reviewer-note', {
          id: selectedComplaint._id,
          reviewerNote,
        });
        setSelectedComplaint({ ...selectedComplaint, reviewerNote });
        alert('Reviewer note saved successfully');
      } catch (error) {
        console.error('Error saving reviewer note:', error);
        alert('Failed to save reviewer note');
      }
    }
  };

  const handleAddComplaint = () => {
    window.open('/add-complaint', '_blank');
  };

  return (
    <div className="complaints-container" id="complaints-container">
      <h1 id="complaints-title">Complaints List</h1>
      <button className="add-complaint-button" onClick={handleAddComplaint}>
        <FaPlus /> Add Complaint
      </button>

      {loading ? (
        <div className="loader" id="loader">
          <div className="spinner"></div>
        </div>
      ) : (
        <ul id="complaints-list">
          {complaints.slice().reverse().map(complaint => (
            <li key={complaint._id} onClick={() => handleComplaintClick(complaint)} id={`complaint-${complaint._id}`}>
              <div className="complaint-item" id={`complaint-item-${complaint._id}`}>
                {complaint.attachments && complaint.attachments.length > 0 && (
                  <img
                    src={complaint.attachments[0]}
                    alt="Complaint Attachment"
                    className="complaint-image"
                    id={`complaint-image-${complaint._id}`}
                  />
                )}
                <div className="complaint-info" id={`complaint-info-${complaint._id}`}>
                  <h2 id={`issue-description-${complaint._id}`}>{complaint.issueDescription}</h2>
                  <p><FaTag /> {complaint.productName}</p>
                  <p><FaCalendarAlt /> <strong>Issue Date:</strong> {new Date(complaint.issueDate).toLocaleDateString()}</p>
                  <p><FaMapMarkerAlt /> {complaint.purchasePlace}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedComplaint && (
        <div className="popup-overlay" id="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-card" id="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" id="close-button" onClick={handleClosePopup}>
              <FaTimes />
            </button>
            <h2 id="selected-issue-description">{selectedComplaint.issueDescription}</h2>
            <div className="popup-details" id="popup-details">
              <p><FaUser /> <strong>Contact Info:</strong> {selectedComplaint.contactInfo}</p>
              <p><FaBuilding /> <strong>Address:</strong> {selectedComplaint.address}</p>
              <p><FaTag /> <strong>Brand Name:</strong> {selectedComplaint.brandName}</p>
              <p><FaTag /> <strong>Product Name:</strong> {selectedComplaint.productName}</p>
              <p><FaBarcode /> <strong>Product Code:</strong> {selectedComplaint.productCode}</p>
              <p><FaBarcode /> <strong>Batch Number:</strong> {selectedComplaint.batchNumber}</p>
              <p><FaCalendarAlt /> <strong>Expiration Date:</strong> {new Date(selectedComplaint.expirationDate).toLocaleDateString()}</p>
              <p><FaCalendarAlt /> <strong>Purchase Date:</strong> {new Date(selectedComplaint.purchaseDate).toLocaleDateString()}</p>
              <p><FaMapMarkerAlt /> <strong>Purchase Place:</strong> {selectedComplaint.purchasePlace}</p>
              <p><FaWarehouse /> <strong>Storage Info:</strong> {selectedComplaint.storageInfo}</p>
              <p><FaMedkit /> <strong>Health Effects:</strong> {selectedComplaint.healthEffects}</p>
              <p><FaCommentDots /> <strong>Desired Resolution:</strong> {selectedComplaint.desiredResolution}</p>
              <p><FaCommentDots /> <strong>Additional Comments:</strong> {selectedComplaint.additionalComments}</p>
            </div>

            <div className="reviewer-note-section" id="reviewer-note-section">
              <h3 id="reviewer-note-title">Add Reviewer Note</h3>
              <textarea
                value={reviewerNote}
                onChange={(e) => setReviewerNote(e.target.value)}
                placeholder="Enter your note here"
                className="reviewer-note-textarea"
                id="reviewer-note-textarea"
              ></textarea>
              <button onClick={handleSaveNote} className="save-note-button" id="save-note-button">
                <FaSave /> Add Note
              </button>
            </div>

            {selectedComplaint.attachments && selectedComplaint.attachments.length > 0 && (
              <div className="attachments-section" id="attachments-section">
                <h3 id="attachments-title">Attachments:</h3>
                <div className="attachments-grid" id="attachments-grid">
                  {selectedComplaint.attachments.map((attachment, index) => (
                    <img key={index} src={attachment} alt={`Attachment ${index + 1}`} className="attachment-image" id={`attachment-${index}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintCompo;