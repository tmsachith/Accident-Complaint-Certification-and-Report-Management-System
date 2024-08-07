import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComplaintCompo.css';

const ComplaintCompo = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

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
  };

  const handleClosePopup = () => {
    setSelectedComplaint(null);
  };

  return (
    <div className="complaints-container">
      <h1>Complaints List</h1>
      <ul>
        {complaints.map(complaint => (
          <li key={complaint._id} onClick={() => handleComplaintClick(complaint)}>
            <h2>{complaint.issueDescription}</h2>
            <div className="complaint-details">
              <p>{complaint.productName}</p>
            </div>
            <p className="issue-date"><strong>Issue Date:</strong> {new Date(complaint.issueDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      {selectedComplaint && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClosePopup}>X</button>
            <h2>{selectedComplaint.issueDescription}</h2>
            <p><strong>Contact Info:</strong> {selectedComplaint.contactInfo}</p>
            <p><strong>Address:</strong> {selectedComplaint.address}</p>
            <p><strong>Brand Name:</strong> {selectedComplaint.brandName}</p>
            <p><strong>Product Name:</strong> {selectedComplaint.productName}</p>
            <p><strong>Product Code:</strong> {selectedComplaint.productCode}</p>
            <p><strong>Batch Number:</strong> {selectedComplaint.batchNumber}</p>
            <p><strong>Expiration Date:</strong> {new Date(selectedComplaint.expirationDate).toLocaleDateString()}</p>
            <p><strong>Purchase Date:</strong> {new Date(selectedComplaint.purchaseDate).toLocaleDateString()}</p>
            <p><strong>Purchase Place:</strong> {selectedComplaint.purchasePlace}</p>
            <p><strong>Storage Info:</strong> {selectedComplaint.storageInfo}</p>
            <p><strong>Health Effects:</strong> {selectedComplaint.healthEffects}</p>
            <p><strong>Desired Resolution:</strong> {selectedComplaint.desiredResolution}</p>
            <p><strong>Additional Comments:</strong> {selectedComplaint.additionalComments}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintCompo;
