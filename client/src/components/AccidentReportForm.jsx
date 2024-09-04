import React, { useState } from 'react';
import axios from 'axios';
import './AccidentReportForm.css';

const AccidentReportForm = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    department: '',
    position: '',
    accidentDate: '',
    accidentTime: '',
    accidentLocation: '',
    description: '',
    injuryType: '',
    severity: '',
    bodyPartAffected: '',
    actionsTaken: '',
    reportedTo: '',
    witnesses: '',
    witnessContact: '',
    attachments: [], // Array of Base64 strings
    supervisorComments: '',
    status: 'Pending Review',
    notifyManagement: false,
    additionalNotes: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showAlert = (message, type) => {
    alert(`${type}: ${message}`);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      promises.push(convertFileToBase64(files[i]));
    }

    Promise.all(promises).then(base64Files => {
      setFormData({
        ...formData,
        attachments: base64Files,
      });
    });
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/accidents', formData);

      if (response.status === 201) {
        setSuccessMessage('Accident report created successfully!');
        setErrorMessage('');
        showAlert('Accident report created successfully!', 'Success');
        // Optionally, reset the form after successful submission
        setFormData({
          employeeId: '',
          employeeName: '',
          department: '',
          position: '',
          accidentDate: '',
          accidentTime: '',
          accidentLocation: '',
          description: '',
          injuryType: '',
          severity: '',
          bodyPartAffected: '',
          actionsTaken: '',
          reportedTo: '',
          witnesses: '',
          witnessContact: '',
          attachments: [],
          supervisorComments: '',
          status: 'Pending Review',
          notifyManagement: false,
          additionalNotes: '',
        });
      }
    } catch (error) {
        const serverErrorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        setErrorMessage(`Failed to create accident report: ${serverErrorMessage}`);
        showAlert(`Failed to create accident report: ${serverErrorMessage}`, 'Error');
      setSuccessMessage('');
    }
  };

  return (
    <form className="accident-report-form" onSubmit={handleSubmit}>
      <h2>Accident Report Form</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <label htmlFor="employeeId">Employee ID:</label>
        <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="employeeName">Employee Name:</label>
        <input type="text" id="employeeName" name="employeeName" value={formData.employeeName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="department">Department:</label>
        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="position">Position:</label>
        <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="accidentDate">Accident Date:</label>
        <input type="date" id="accidentDate" name="accidentDate" value={formData.accidentDate} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="accidentTime">Accident Time:</label>
        <input type="time" id="accidentTime" name="accidentTime" value={formData.accidentTime} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="accidentLocation">Accident Location:</label>
        <input type="text" id="accidentLocation" name="accidentLocation" value={formData.accidentLocation} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Accident Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="injuryType">Injury Type:</label>
        <input type="text" id="injuryType" name="injuryType" value={formData.injuryType} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="severity">Severity:</label>
        <input type="text" id="severity" name="severity" value={formData.severity} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="bodyPartAffected">Body Part Affected:</label>
        <input type="text" id="bodyPartAffected" name="bodyPartAffected" value={formData.bodyPartAffected} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="actionsTaken">Immediate Actions Taken:</label>
        <textarea id="actionsTaken" name="actionsTaken" value={formData.actionsTaken} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="reportedTo">Reported To:</label>
        <input type="text" id="reportedTo" name="reportedTo" value={formData.reportedTo} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="witnesses">Witnesses:</label>
        <input type="text" id="witnesses" name="witnesses" value={formData.witnesses} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="witnessContact">Witness Contact:</label>
        <input type="text" id="witnessContact" name="witnessContact" value={formData.witnessContact} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="attachments">Attachments:</label>
        <input type="file" id="attachments" name="attachments" multiple onChange={handleFileChange} />
      </div>
      <div className="form-group">
        <label htmlFor="supervisorComments">Supervisor’s Comments:</label>
        <textarea id="supervisorComments" name="supervisorComments" value={formData.supervisorComments} onChange={handleChange} />
      </div>
      <div className="form-buttons">
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setFormData({ ...formData, status: 'Draft' })}>Save as Draft</button>
      </div>
    </form>
  );
};

export default AccidentReportForm;
