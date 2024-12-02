import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import './ReportContent.css';

const ReportContent = () => {
  const [view, setView] = useState('accidents');

  const handleDropdownChange = (event) => {
    setView(event.target.value);
  };

  const handleExportPDF = () => {
    alert(`Exporting ${view} report as PDF...`);
  };

  return (
    <div className="report-content-container">
      <div className="control-group">
        <select className="report-dropdown" value={view} onChange={handleDropdownChange}>
          <option value="accidents">Accidents</option>
          <option value="complaints">Complaints</option>
        </select>
        <button className="export-button" onClick={handleExportPDF}>
          <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '8px' }} />
          Export as PDF
        </button>
      </div>
      {view === 'accidents' && (
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/c87b71b9-2add-4af2-8a14-472a3a1d9a1c/page/N42GE"
          title="Accidents"
          width="100%"
          height="600px"
          style={{ border: 'none' }}
        />
      )}
      {view === 'complaints' && (
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/d911f996-f4ba-47fa-8cc7-1357986e0598/page/4bnHE"
          title="Complaints"
          width="100%"
          height="600px"
          style={{ border: 'none' }}
        />
      )}
    </div>
  );
};

export default ReportContent;