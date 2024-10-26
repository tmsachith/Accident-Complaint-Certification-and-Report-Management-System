import React, { useState } from 'react';
import AccidentChart from './AccidentChart';
// import ComplaintsChart from './ComplaintsChart'; // Add this when ready

const ReportContent = () => {
  const [view, setView] = useState('accidents');

  return (
    <div className="report-content-container">
      <div className="button-group">
        <button onClick={() => setView('accidents')}>Accidents</button>
        <button onClick={() => setView('complaints')}>Complaints</button>
      </div>
      {view === 'accidents' && <AccidentChart />}
      {/* {view === 'complaints' && <ComplaintsChart />} */}
    </div>
  );
};

export default ReportContent;