import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CertificateChangeDetails from '../components/CertificateChangeDetails';
import './CertificateChangeShow.css';

const CertificateChangeShow = () => {
  const { id } = useParams(); // Get the certificate change ID from the URL

  return (
    <div className="certificate-change-show-page">
     
      <div className="certificate-change-show-main">
        <Sidebar />
        <CertificateChangeDetails changeId={id} /> {/* Pass the change ID to CertificateChangeDetails */}
      </div>
    </div>
  );
};

export default CertificateChangeShow;