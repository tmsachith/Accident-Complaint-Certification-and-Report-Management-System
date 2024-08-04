import React from 'react';
import './complaintbox.css';

const ComplaintBox = ({ complaint, onClose }) => {
  if (!complaint) return null;

  return (
    <div className="complaintbox-overlay">
      <div className="complaintbox">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Complaint Details</h2>
        <div>
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> {complaint.name}</p>
          <p><strong>Contact Information:</strong> {complaint.contactInfo}</p>
          <p><strong>Address:</strong> {complaint.address}</p>
        </div>
        <div>
          <h3>Product Details</h3>
          <p><strong>Brand Name:</strong> {complaint.brandName}</p>
          <p><strong>Product Name:</strong> {complaint.productName}</p>
          <p><strong>Product Code/Number:</strong> {complaint.productCode}</p>
          <p><strong>Batch/Lot Number:</strong> {complaint.batchNumber}</p>
          <p><strong>Expiration Date:</strong> {new Date(complaint.expirationDate).toLocaleDateString()}</p>
          <p><strong>Date of Purchase:</strong> {new Date(complaint.purchaseDate).toLocaleDateString()}</p>
          <p><strong>Place of Purchase:</strong> {complaint.purchasePlace}</p>
        </div>
        <div>
          <h3>Complaint Details</h3>
          <p><strong>Description of the Issue:</strong> {complaint.issueDescription}</p>
          <p><strong>Date Issue Discovered:</strong> {new Date(complaint.issueDate).toLocaleDateString()}</p>
          <p><strong>How was the Product Stored:</strong> {complaint.storageInfo}</p>
          <p><strong>Any Health Effects Experienced:</strong> {complaint.healthEffects}</p>
          <p><strong>Desired Resolution:</strong> {complaint.desiredResolution}</p>
          <p><strong>Additional Comments:</strong> {complaint.additionalComments}</p>
        </div>
      </div>
    </div>
  );
};

export default complaintbox;
