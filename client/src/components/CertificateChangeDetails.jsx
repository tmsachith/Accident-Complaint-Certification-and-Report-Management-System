import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CertificateChangeDetails.css';

const CertificateChangeDetails = ({ changeId }) => {
  const [certificateChange, setCertificateChange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCertificateChange = async () => {
      try {
        const response = await fetch(`/api/certificate-changes/${changeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch certificate change details');
        }
        const data = await response.json();
        setCertificateChange(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateChange();
  }, [changeId]);

  // Function to handle updating status (approve/reject) and saving comments
  const handleUpdate = async (newStatus) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/certificate-changes/${changeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, comments: comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to update certificate change');
      }

      const updatedData = await response.json();
      setCertificateChange(updatedData);
      setComment('');
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!certificateChange) {
    return <div className="error">Certificate change not found</div>;
  }

  return (
    <div className="certificate-change-details-container">
      {/* Status at the top */}
      <div className={`status-card ${certificateChange.status === 'Approved' ? 'approved' : certificateChange.status === 'Rejected' ? 'rejected' : 'pending'}`}>
        Status: {certificateChange.status}
      </div>
      
      <h2>Certificate Change Details</h2>
      <p><strong>Request ID:</strong> {certificateChange.requestId}</p>
      <p><strong>Request Name:</strong> {certificateChange.requestName}</p>
      <p><strong>Change Date:</strong> {new Date(certificateChange.changeDate).toLocaleDateString()}</p>
      
      {/* Description with clickable links and new line preservation */}
      <p><strong>Description:</strong></p>
      <pre className="description-text">
        {certificateChange.changeDescription.split('\n').map((line, index) => (
          <span key={index}>
            {line.split(' ').map((word, i) =>
              word.startsWith('http') ? (
                <a key={i} href={word} target="_blank" rel="noopener noreferrer">{word}</a>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
            <br />
          </span>
        ))}
      </pre>
      
      <p><strong>Requested By:</strong> {certificateChange.requestedBy}</p>
      <p><strong>Notify Stakeholders:</strong> {certificateChange.notifyStakeholders ? 'Yes' : 'No'}</p>

      {/* Show comments only if status is 'Approved' or 'Rejected' */}
      {['Approved', 'Rejected'].includes(certificateChange.status) && (
        <p><strong>Comments:</strong> {certificateChange.comments || 'None'}</p>
      )}

      {/* Field to add comment and approve/reject the request */}
      {certificateChange.status === 'Pending Review' && (
        <>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comments here"
            className="comment-box"
          />
          <div className="action-buttons">
            <button onClick={() => handleUpdate('Approved')} disabled={saving} className="approve-button">
              {saving ? 'Saving...' : 'Approve'}
            </button>
            <button onClick={() => handleUpdate('Rejected')} disabled={saving} className="reject-button">
              {saving ? 'Saving...' : 'Reject'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

CertificateChangeDetails.propTypes = {
  changeId: PropTypes.string.isRequired,
};

export default CertificateChangeDetails;
