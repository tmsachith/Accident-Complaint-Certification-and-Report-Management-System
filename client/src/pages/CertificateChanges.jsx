import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CertificateChange from '../components/CertificateChange';
import './CertificateChanges.css';

const CertificateChanges = () => {
  return (
    <div className="certificate-changes">
     
      <div className="certificate-changes-main">
      <Sidebar />
        <CertificateChange />
      </div>
    </div>
  );
};

export default CertificateChanges;