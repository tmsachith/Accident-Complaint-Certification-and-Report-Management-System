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
        const response = await fetch(`${import.meta.env.BASE_URL}/api/certificate-changes/${changeId}`);
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

  const handleUpdate = async (newStatus) => {
    setSaving(true);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}/api/certificate-changes/${changeId}`, {
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
      <div className="info-card">
        <p><strong>Requested By:</strong> {certificateChange.requestedBy}</p>
        <p className="request-id">{certificateChange.requestId}</p>
      </div>

      <div className="info-card">
        <p><strong>Change Date:</strong> {new Date(certificateChange.changeDate).toLocaleDateString()}</p>
      </div>

      <div className="info-card">
        <h2>{certificateChange.requestName}</h2>
      </div>

      <div className="description-card">
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
      </div>

      <div className={`status-card ${certificateChange.status === 'Approved' ? 'approved' : certificateChange.status === 'Rejected' ? 'rejected' : 'pending'}`}>
        Status: {certificateChange.status}
      </div>

      {['Approved', 'Rejected'].includes(certificateChange.status) && (
        <div className="info-card">
          <p><strong>Comments:</strong> {certificateChange.comments || 'None'}</p>
        </div>
      )}

      {certificateChange.status === 'Pending Review' && (
        <>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comments here"
            className="comment-box"
          />
          <div className="action-buttons">
            <button
              onClick={() => handleUpdate('Approved')}
              disabled={saving || !comment.trim()}
              className="approve-button"
            >
              {saving ? 'Saving...' : 'Approve'}
            </button>
            <button
              onClick={() => handleUpdate('Rejected')}
              disabled={saving || !comment.trim()}
              className="reject-button"
            >
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