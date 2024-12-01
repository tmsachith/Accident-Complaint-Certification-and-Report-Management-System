import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaPlus } from 'react-icons/fa';
import { format, isToday, isWithinInterval, subDays } from 'date-fns'; // Import date-fns functions
import './ComplaintCompo.css';
import { formatDistanceToNow } from 'date-fns';

const ComplaintCompo = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(import.meta.env.BASE_URL + '/api/complaints');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleComplaintClick = (complaint) => {
    window.open(`/complaint-details/${complaint._id}`, '_blank');
  };

  const handleAddComplaint = () => {
    window.open('/add-complaint', '_blank');
  };

  const filteredComplaints = complaints.filter(
    (complaint) => complaint.status.toLowerCase() === activeTab
  );

  // New filters for complaints
  const todayComplaints = complaints.filter(complaint => isToday(new Date(complaint.createdAt)));
  const last7DaysComplaints = complaints.filter(complaint =>
    isWithinInterval(new Date(complaint.createdAt), {
      start: subDays(new Date(), 7),
      end: new Date()
    })
  );
  const last30DaysComplaints = complaints.filter(complaint =>
    isWithinInterval(new Date(complaint.createdAt), {
      start: subDays(new Date(), 30),
      end: new Date()
    })
  );

  return (
    <div className="complaints-container">
      <div>
        {/* <h1>Complaints List</h1> */}
        <button className="add-complaint-button" onClick={handleAddComplaint}>
          <FaPlus /> Add Complaint
        </button>
      </div>

      {/* New cards for Today's, Last 7 Days, Last 30 Days complaints */}
      <div className="complaint-stats">
        <div className="stat-card">
          <h3>{todayComplaints.length}</h3>
          <p> Today</p>
        </div>
        <div className="stat-card">
          <h3>{last7DaysComplaints.length} </h3>
          <p> Last 7 Days</p>
        </div>
        <div className="stat-card">
          <h3>{last30DaysComplaints.length}</h3>
          <p>Last 30 Days</p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab1 ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button
          className={`tab ${activeTab === 'closed' ? 'active' : ''}`}
          onClick={() => setActiveTab('closed')}
        >
          Closed
        </button>
      </div>

      {loading ? (
        <div className="loader" id="loader">
          <div className="spinner"></div>
        </div>
      ) : (
        <ul id="complaints-list">
          {filteredComplaints.slice().reverse().map((complaint) => (
            <li key={complaint._id} onClick={() => handleComplaintClick(complaint)} onMouseEnter={() => setHoveredCard(complaint._id)} onMouseLeave={() => setHoveredCard(null)} id={`complaint-${complaint._id}`}>
              <div className="complaint-item" id={`complaint-item-${complaint._id}`}>
                {complaint.attachments && complaint.attachments.length > 0 && (
                  <img
                    src={`${complaint.attachments[0]}`}
                    alt="Complaint Attachment"
                    className="complaint-image"
                    id={`complaint-image-${complaint._id}`}
                  />
                )}
                <div className="complaint-info" id={`complaint-info-${complaint._id}`}>
                  <h2 id={`issue-description-${complaint._id}`}>{complaint.issueTitle}</h2>
                  <p><FaTag /> {complaint.productName}</p>
                  <p><FaMapMarkerAlt /> {complaint.purchasePlace}</p>
                  <span className={`status-label ${complaint.status.toLowerCase()}`}>{complaint.status}</span>
                  <div className="created-at-container">
                    <p className="created-at">
                      <FaCalendarAlt />{" "}
                      {hoveredCard === complaint._id
                        ? format(new Date(complaint.createdAt), "PPpp")
                        : formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComplaintCompo;