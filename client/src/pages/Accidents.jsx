import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SupervisorAccident from '../components/SupervisorAcci';
import './Accidents.css';

const Accidents = () => {
  return (
    <div className="accidents">
    
      <div className="accidents-main">
        <Sidebar />
        <SupervisorAccident />
      </div>
    </div>
  );
};

export default Accidents;