import React, { useState } from 'react';

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
          Accidents
        </button>
        <button 
          className={`button ${view === 'complaints' ? 'active' : ''}`}
          onClick={() => handleTabChange('complaints')}
        >
          Complaints
        </button>
      </div>
      {loaded.accidents && (
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/a32084ae-3a39-45fc-bd11-fd23463a1e70/page/N42GE"
          title="Accidents"
          width="100%"
          height="600px"
          style={{ border: 'none', display: view === 'accidents' ? 'block' : 'none' }}
        />
      )}
      {loaded.complaints && (
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/7299a0f1-75fb-40f8-a323-6a1a4716623d/page/4bnHE"
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