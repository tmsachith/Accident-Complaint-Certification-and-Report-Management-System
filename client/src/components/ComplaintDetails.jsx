import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './ComplaintDetails.css';

const ComplaintDetails = ({ complaintId }) => {
  const [complaint, setComplaint] = useState(null);
  const [reviewNote, setReviewNote] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}/api/complaints/${complaintId}`);
        const data = await response.json();
        setComplaint(data);
      } catch (error) {
        console.error('Failed to fetch complaint details:', error);
      }
    };

    fetchComplaintDetails();
  }, [complaintId]);

  const handleReviewNoteChange = (e) => {
    setReviewNote(e.target.value);
  };

  const handleSubmitReviewNote = async () => {
    if (!reviewNote.trim()) return;

    try {
      await fetch(`${import.meta.env.BASE_URL}/api/complaints/reviewer-note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: complaintId, reviewerNote: reviewNote, status: 'Closed' }),
      });


     const emailData = {
      to: complaint.contactInfo, // Use the contact info for the email
      subject: 'Complaint Review Completed',
      text: `Dear ${complaint.name},\n\nYour complaint titled "${complaint.issueTitle}" has been reviewed. The review note is as follows:\n\n"${reviewNote}"\n\nThank you for your patience.\n\nBest regards,\nCustomer Support Team`,
    };

    await fetch(import.meta.env.BASE_URL+'/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
      alert('Review note added successfully.');
      window.location.reload();
    } catch (error) {
      console.error('Failed to add review note:', error);
    }
  };

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handlePrint} className="print-button">Export as PDF</button>
      <div className="complaint-details" ref={componentRef}>
        <h2>Complaint Details</h2>

        <section className="user-details">
          <h3>User Details</h3>
          <p><strong>Name:</strong> {complaint.name}</p>
          <p><strong>Contact Info:</strong> {complaint.contactInfo}</p>
          <p><strong>Address:</strong> {complaint.address}</p>
        </section>

        <section className="product-details">
          <h3>Product Details</h3>
          <p><strong>Brand Name:</strong> {complaint.brandName}</p>
          <p><strong>Product Name:</strong> {complaint.productName}</p>
          <p><strong>Product Code:</strong> {complaint.productCode}</p>
          <p><strong>Batch Number:</strong> {complaint.batchNumber}</p>
          <p><strong>Expiration Date:</strong> {new Date(complaint.expirationDate).toLocaleDateString()}</p>
          <p><strong>Purchase Date:</strong> {new Date(complaint.purchaseDate).toLocaleDateString()}</p>
          <p><strong>Purchase Place:</strong> {complaint.purchasePlace}</p>
        </section>

        <section className="complaint-details-section">
          <h3>Complaint Details</h3>
          <p><strong>Issue Title:</strong> {complaint.issueTitle}</p>
          <p><strong>Issue Description:</strong> {complaint.issueDescription}</p>
          <p><strong>Issue Date:</strong> {new Date(complaint.issueDate).toLocaleDateString()}</p>
          <p><strong>Storage Info:</strong> {complaint.storageInfo}</p>
          <p><strong>Health Effects:</strong> {complaint.healthEffects}</p>
          <p><strong>Desired Resolution:</strong> {complaint.desiredResolution}</p>
          <p><strong>Additional Comments:</strong> {complaint.additionalComments}</p>
          <p><strong>Reviewer Note:</strong> {complaint.reviewerNote}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
          <div>
            <strong>Attachments:</strong>
            <div className="attachments">
              {complaint.attachments.map((file, index) => (
                <img
                  key={index}
                  src={`${file}`}
                  alt={`Attachment ${index + 1}`}
                  onClick={() => openModal(`${file}`)}
                />
              ))}
            </div>
          </div>
        </section>

        {complaint.status === "Pending" && (
          <div className="review-note">
            <h3>Add Review Note</h3>
            <textarea
              value={reviewNote}
              onChange={handleReviewNoteChange}
              placeholder="Enter your review note here..."
            />
            <button onClick={handleSubmitReviewNote} disabled={!reviewNote.trim()}>Submit</button>
          </div>
        )}

        {modalImage && (
          <div className="modal" onClick={closeModal}>
            <img src={modalImage} alt="Full View" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetails;