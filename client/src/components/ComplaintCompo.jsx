import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaTimes, FaUser, FaBuilding, FaBarcode, FaWarehouse, FaMedkit, FaCommentDots, FaSave } from 'react-icons/fa';
import './ComplaintCompo.css';

const ComplaintCompo = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [reviewerNote, setReviewerNote] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('/api/complaints');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
    setReviewerNote(complaint.reviewerNote || '');  // Set initial note value
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
        setSelectedComplaint({ ...selectedComplaint, reviewerNote }); // Update local state
        alert('Reviewer note saved successfully');
      } catch (error) {
        console.error('Error saving reviewer note:', error);
        alert('Failed to save reviewer note');
      }
    }
  };

  return (
    <div className="complaints-container">
      <h1>Complaints List</h1>
      <ul>
        {complaints.slice().reverse().map(complaint => (
          <li key={complaint._id} onClick={() => handleComplaintClick(complaint)}>
            <div className="complaint-item">
              {complaint.attachments && complaint.attachments.length > 0 && (
                <img
                  src={complaint.attachments[0]}
                  alt="Complaint Attachment"
                  className="complaint-image"
                />
              )}
              <div className="complaint-info">
                <h2>{complaint.issueDescription}</h2>
                <p><FaTag /> {complaint.productName}</p>
                <p><FaCalendarAlt /> <strong>Issue Date:</strong> {new Date(complaint.issueDate).toLocaleDateString()}</p>
                <p><FaMapMarkerAlt /> {complaint.purchasePlace}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedComplaint && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClosePopup}>
              <FaTimes />
            </button>
            <h2>{selectedComplaint.issueDescription}</h2>
            <div className="popup-details">
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

            {/* Reviewer Note Section */}
            <div className="reviewer-note-section">
              <h3>Add Reviewer Note</h3>
              <textarea
                value={reviewerNote}
                onChange={(e) => setReviewerNote(e.target.value)}
                placeholder="Enter your note here"
                className="reviewer-note-textarea"
              ></textarea>
              <button onClick={handleSaveNote} className="save-note-button">
                <FaSave /> Add Note
              </button>
            </div>

            {selectedComplaint.attachments && selectedComplaint.attachments.length > 0 && (
              <div className="attachments-section">
                <h3>Attachments:</h3>
                <div className="attachments-grid">
                  {selectedComplaint.attachments.map((attachment, index) => (
                    <img key={index} src={attachment} alt={`Attachment ${index + 1}`} className="attachment-image" />
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
