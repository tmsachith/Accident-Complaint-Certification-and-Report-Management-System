import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComplaintCompo.css';

const ComplaintCompo = () => {
  const [complaints, setComplaints] = useState([]);

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

  return (
    <div className="complaints-container">
      <h1>Complaints List</h1>
      <ul>
        {complaints.map(complaint => (
          <li key={complaint._id}>
            <h2>{complaint.issueDescription}</h2>
            <p>{complaint.productName}</p>
            <p><strong>Issue Date:</strong> {new Date(complaint.issueDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintCompo;
