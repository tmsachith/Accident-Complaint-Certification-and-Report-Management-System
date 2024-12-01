import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonFallingBurst, faClipboardList, faSpinner } from '@fortawesome/free-solid-svg-icons';

const ReportContent = () => {
  const [view, setView] = useState('accidents');
  const [loaded, setLoaded] = useState({ accidents: false, complaints: false });

  const handleTabChange = (tab) => {
    setView(tab);
    setLoaded((prev) => ({ ...prev, [tab]: true }));
  };

  return (
    <div className="report-content-container">
      <div className="button-group">
        <button 
          className={`button ${view === 'accidents' ? 'active' : ''}`}
          onClick={() => handleTabChange('accidents')}
        >
          <FontAwesomeIcon icon={faPersonFallingBurst} style={{ marginRight: '8px' }} /> 
          Accidents
        </button>
        <button 
          className={`button ${view === 'complaints' ? 'active' : ''}`}
          onClick={() => handleTabChange('complaints')}
        >
          <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '8px' }} /> 
          Complaints
        </button>
      </div>
      {(!loaded.accidents && !loaded.complaints) && (
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          <p>Report Generating...</p>
        </div>
      )}
      {loaded.accidents && (
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/c87b71b9-2add-4af2-8a14-472a3a1d9a1c/page/N42GE"
          title="Accidents"
          width="100%"
          height="600px"
          style={{ border: 'none', display: view === 'accidents' ? 'block' : 'none' }}
        />
      )}
      {loaded.complaints && (
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/d911f996-f4ba-47fa-8cc7-1357986e0598/page/4bnHE"
          title="Complaints"
          width="100%"
          height="600px"
          style={{ border: 'none', display: view === 'complaints' ? 'block' : 'none' }}
        />
      )}
    </div>
  );
};

export default ReportContent;