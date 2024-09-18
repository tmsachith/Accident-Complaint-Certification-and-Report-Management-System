import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AccidentDetails from '../components/Accident_details';
import './Accidentshow.css';

const Accidentshow = () => {
  const { id } = useParams(); // Get the accident ID from the URL

  return (
    <div className="accident-show-page">
     
      <div className="accident-show-main">
        <Sidebar />
        <AccidentDetails accidentId={id} /> {/* Pass the accident ID to AccidentDetails */}
      </div>
    </div>
  );
};

export default Accidentshow;
