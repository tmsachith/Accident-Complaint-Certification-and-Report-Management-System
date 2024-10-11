import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUserTie, FaCheck } from 'react-icons/fa';
import './CertificateChange.css';

const CertificateChange = () => {
  const [showApproved, setShowApproved] = useState(false);
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [position, setPosition] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    requestId: '',
    requestName: '',
    changeDate: '',
    changeDescription: '',
    requestedBy: '',
    status: 'Pending Review',
    reviewedBy: '',
    comments: '',
    notifyStakeholders: false,
  });

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/certificate-changes');
        const data = await response.json();
        setChanges(data);
      } catch (error) {
        console.error('Error fetching changes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChanges();

    const storedUsername = localStorage.getItem('username');
    const storedPosition = localStorage.getItem('position');
    setUsername(storedUsername);
    setPosition(storedPosition);

    if (storedPosition) {
      setFormData((prevData) => ({
        ...prevData,
        requestId: `REQ-${storedPosition}-${Date.now()}`,
        requestedBy: storedUsername || '',
      }));
    }
  }, []);

  const handleShowApproved = () => setShowApproved(true);
  const handleShowLineManager = () => setShowApproved(false);

  const handleAddChange = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/certificate-changes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Certificate change request submitted successfully');
        setShowModal(false);
        await fetchChanges(); // Refresh the list after submission
      } else {
        const responseText = await response.text();
        alert(`Failed to submit request: ${responseText}`);
      }
    } catch (error) {
      alert(`Error submitting request: ${error.message}`);
    }
  };

  const handleChangeClick = (change) => {
    window.open(`/certificate-change-show/${change._id}`, '_blank');
  };

  const renderChangeList = (changes) => {
    return changes.map((change, index) => (
      <div
        className={`change-item ${change.status === 'Approved' ? 'approved' : 'line-manager'}`}
        key={index}
        onClick={() => handleChangeClick(change)}
      >
        <div className="change-info">
          <div className="change-details">
            <div className="change-title">{change.requestName}</div>
            <div className="change-location-department">
              <FaMapMarkerAlt /> {change.requestedBy} | {new Date(change.changeDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="change-status">
          <div className="status-text">
            {change.status}
            <span className={`status-dot ${change.status === 'Approved' ? 'approved' : 'line-manager'}`}></span>
          </div>
        </div>
      </div>
    ));
  };

  // Filter changes based on tab selection
  const filteredChanges = showApproved
    ? changes.filter((change) => change.status === 'Approved')
    : changes.filter((change) => change.status === 'Pending Review');

  return (
    <div className="certificate-change">
      <button className="add-request-button" onClick={handleAddChange}>
        Add Request
      </button>
      <div className="button-group">
        <button
          className={`toggle-button1 ${!showApproved ? 'active' : ''}`}
          onClick={handleShowLineManager}
        >
          Pending
        </button>
        <button
          className={`toggle-button ${showApproved ? 'active' : ''}`}
          onClick={handleShowApproved}
        >
          Closed
        </button>
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="change-list">
          {renderChangeList(filteredChanges)}
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Request Special Standard Procedure Change</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Request ID:
                <input
                  type="text"
                  name="requestId"
                  value={formData.requestId}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Request Name:
                <input
                  type="text"
                  name="requestName"
                  value={formData.requestName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Change Date:
                <input
                  type="date"
                  name="changeDate"
                  value={formData.changeDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Change Description:
                <textarea
                  name="changeDescription"
                  value={formData.changeDescription}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Requested By:
                <input
                  type="text"
                  name="requestedBy"
                  value={formData.requestedBy}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Reviewed By:
                <input
                  type="text"
                  name="reviewedBy"
                  value={formData.reviewedBy}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Comments:
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Notify Stakeholders:
                <input
                  type="checkbox"
                  name="notifyStakeholders"
                  checked={formData.notifyStakeholders}
                  onChange={handleInputChange}
                />
              </label>
              <div className="form-buttons">
                <button type="submit">Submit Request</button>
                <button type="button" onClick={handleModalClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateChange;