import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCertificate, FaUser, FaCalendarAlt  } from 'react-icons/fa';
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
    comments: '',
    notifyStakeholders: false,
  });

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/certificate-changes');
        const data = await response.json();
  
        // Sort the changes array by createdAt (latest first)
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
        setChanges(sortedData); // Set the sorted data
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
        requestedBy: `${storedUsername} (${storedPosition})`,
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
        <div className="change-icon">
          <FaCertificate />
        </div>
        <div className="change-info">
          <div className="change-details">
            <div className="change-title">{change.requestName}</div>
            <div className="change-location-department">
              <FaUser /> {change.requestedBy} | <FaCalendarAlt /> {new Date(change.changeDate).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
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

  const filteredChanges = showApproved
  ? changes.filter((change) => change.status === 'Approved' || change.status === 'Rejected') // Show both Approved and Rejected in the Closed tab
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
        <div className="loader"></div>
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
                  disabled
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
                  disabled
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
