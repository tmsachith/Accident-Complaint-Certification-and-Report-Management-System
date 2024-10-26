import React, { useEffect, useState } from 'react';
import './ComplaintDetails.css';

const ComplaintDetails = ({ complaintId }) => {
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const response = await fetch(`/api/complaints/${complaintId}`);
        const data = await response.json();
        setComplaint(data);
      } catch (error) {
        console.error('Failed to fetch complaint details:', error);
      }
    };

    fetchComplaintDetails();
  }, [complaintId]);

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div className="complaint-details">
      <h2>Complaint Details</h2>
      <p><strong>ID:</strong> {complaint._id}</p>
      <p><strong>Name:</strong> {complaint.name}</p>
      <p><strong>Contact Info:</strong> {complaint.contactInfo}</p>
      <p><strong>Address:</strong> {complaint.address}</p>
      <p><strong>Brand Name:</strong> {complaint.brandName}</p>
      <p><strong>Product Name:</strong> {complaint.productName}</p>
      <p><strong>Product Code:</strong> {complaint.productCode}</p>
      <p><strong>Batch Number:</strong> {complaint.batchNumber}</p>
      <p><strong>Expiration Date:</strong> {new Date(complaint.expirationDate).toLocaleDateString()}</p>
      <p><strong>Purchase Date:</strong> {new Date(complaint.purchaseDate).toLocaleDateString()}</p>
      <p><strong>Purchase Place:</strong> {complaint.purchasePlace}</p>
      <p><strong>Issue Title:</strong> {complaint.issueTitle}</p>
      <p><strong>Issue Description:</strong> {complaint.issueDescription}</p>
      <p><strong>Issue Date:</strong> {new Date(complaint.issueDate).toLocaleDateString()}</p>
      <p><strong>Storage Info:</strong> {complaint.storageInfo}</p>
      <p><strong>Health Effects:</strong> {complaint.healthEffects}</p>
      <p><strong>Desired Resolution:</strong> {complaint.desiredResolution}</p>
      <p><strong>Additional Comments:</strong> {complaint.additionalComments}</p>
      <p><strong>Reviewer Note:</strong> {complaint.reviewerNote}</p>
      <div>
        <strong>Attachments:</strong>
        <ul>
          {complaint.attachments.map((file, index) => (
            <li key={index}>
              <a href={`/uploads/complaints/${file}`} target="_blank" rel="noopener noreferrer">
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComplaintDetails;