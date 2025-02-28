import React, { useEffect, useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import './ComplaintDetails.css';

const ComplaintDetails = ({ complaintId }) => {
  const [complaint, setComplaint] = useState(null);
  const [reviewNote, setReviewNote] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const [alert, setAlert] = useState(null);
  const componentRef = useRef();
  const pdfButtonRef = useRef();

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}/api/complaints/${complaintId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setComplaint(data);
      } catch (error) {
        console.error('Failed to fetch complaint details:', error);
        showAlert('Failed to fetch complaint details.', 'error');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: complaintId, reviewerNote: reviewNote, status: 'Closed' }),
      });

      const emailData = {
        to: complaint.contactInfo,
        subject: 'Complaint Review Completed',
        text: `Dear ${complaint.name},\n\nYour complaint titled "${complaint.issueTitle}" has been reviewed. The review note is as follows:\n\n"${reviewNote}"\n\nThank you for your patience.\n\nBest regards,\nCustomer Support Team`,
      };

      await fetch(import.meta.env.BASE_URL + '/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });

      showAlert('Review note added successfully.', 'success');
      setReviewNote('');
      window.location.reload();
    } catch (error) {
      console.error('Failed to add review note:', error);
      showAlert('Failed to add review note.', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const openModal = (imageUrl) => setModalImage(imageUrl);
  const closeModal = () => setModalImage(null);

  const generatePDF = () => {
    if (pdfButtonRef.current) {
      pdfButtonRef.current.style.display = 'none';
    }
  
    htmlToImage
      .toPng(componentRef.current, { quality: 0.95 })
      .then((dataUrl) => {
        const pdf = new jsPDF();
  
        // Add company header
        pdf.setFontSize(16);
        pdf.text('Bio Foods (Pvt) Ltd', 10, 10); // Replace 'Company Name' with your actual company name
        pdf.setFontSize(12);
        pdf.text('52, 1/D New Kandy Rd, Kaduwela', 10, 16);
        pdf.text('Phone: 0117 487 100 | Email: info@biofoodslk.com', 10, 22);
  
        // Add the main content image
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        pdf.addImage(dataUrl, 'PNG', 0, 30, pdfWidth, pdfHeight);
  
        // Add a signature section
        const bottomY = pdfHeight + 40; // Adjust '40' based on the content height
        pdf.setFontSize(12);
        pdf.text('Signature:', 10, bottomY);
        pdf.line(30, bottomY, 100, bottomY); // Add a line for the signature
  
        pdf.save(`${complaintId}.pdf`);
  
        if (pdfButtonRef.current) {
          pdfButtonRef.current.style.display = 'block';
        }
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
  
        if (pdfButtonRef.current) {
          pdfButtonRef.current.style.display = 'block';
        }
      });
  };

  if (!complaint) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {alert && <div className={`alert ${alert.type}`}>{alert.message}</div>}

      <div className="complaint-details" ref={componentRef}>
        {/* <h2>Complaint Details</h2> */}

        {/* Status Bar */}
        <section className="status-bar">
          <p>Status: <strong>{complaint.status}</strong></p>
        </section>

        <div className="details-container">
          {/* User Details */}
          <section className="user-details section">
            <h3>User Details</h3>
            <div className="details-grid">
              <p><strong>Name:</strong> {complaint.name}</p>
              <p><strong>Contact Info:</strong> {complaint.contactInfo}</p>
              <p><strong>Address:</strong> {complaint.address}</p>
            </div>
          </section>

          {/* Product Details */}
          <section className="product-details section">
            <h3>Product Details</h3>
            <div className="details-grid">
              <p><strong>Brand Name:</strong> {complaint.brandName}</p>
              <p><strong>Product Name:</strong> {complaint.productName}</p>
              <p><strong>Product Code:</strong> {complaint.productCode}</p>
              <p><strong>Batch Number:</strong> {complaint.batchNumber}</p>
              <p><strong>Expiration Date:</strong> {new Date(complaint.expirationDate).toLocaleDateString()}</p>
              <p><strong>Purchase Date:</strong> {new Date(complaint.purchaseDate).toLocaleDateString()}</p>
              <p><strong>Purchase Place:</strong> {complaint.purchasePlace}</p>
            </div>
          </section>

          {/* Complaint Details */}
          <section className="complaint-details-section section">
            <h3>Complaint Details</h3>
            <div className="details-gride">
              <p><strong>Issue Title:</strong> {complaint.issueTitle}</p>
              <p><strong>Issue Description:</strong> {complaint.issueDescription}</p>
              <p><strong>Issue Date:</strong> {new Date(complaint.issueDate).toLocaleDateString()}</p>
              <p><strong>Storage Info:</strong> {complaint.storageInfo}</p>
              <p><strong>Health Effects:</strong> {complaint.healthEffects}</p>
              <p><strong>Desired Resolution:</strong> {complaint.desiredResolution}</p>
              <p><strong>Additional Comments:</strong> {complaint.additionalComments}</p>
              
            </div>

            
          </section>
          <section className="attachment section">
            {/* Attachments */}
            <h3>Attachemnts</h3>
            <div className="attachments-container">
              
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

          {/* review note showing */}
          {complaint.status === "Closed" && (
          <section className="review-note-showing section">
            <h3>Review</h3>
            <div className="details-grid">
            <p> {complaint.reviewerNote}</p>
            </div>
          </section>
          )}

          {/* Review Note Section */}
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

          {/* Modal for Image Preview */}
          {modalImage && (
            <div className="modal" onClick={closeModal}>
              <img src={modalImage} alt="Full View" />
            </div>
          )}

          {/* PDF Export Button */}
          <button 
            ref={pdfButtonRef} 
            className="export-pdf-button" 
            onClick={complaint.status === "Closed" ? generatePDF : null}
            disabled={complaint.status !== "Closed"}
          >
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;