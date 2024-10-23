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
    attachments: [],
    supervisorComments: '',
    status: 'Line Manager Review',
    notifyManagement: false,
    additionalNotes: '',
  });

  const [imagePreviews, setImagePreviews] = useState([]);
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
    const files = Array.from(e.target.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    const validFiles = files.filter(file => validTypes.includes(file.type) && file.size <= maxSize);

    if (validFiles.length !== files.length) {
      setErrorMessage('Invalid file type or size. Only JPG, PNG, and GIF files under 2 MB are allowed.');
      showAlert('Invalid file type or size. Only JPG, PNG, and GIF files under 2 MB are allowed.', 'Error');
      return;
    }

    setImagePreviews(validFiles.map(file => URL.createObjectURL(file)));
    setFormData({
      ...formData,
      attachments: validFiles,
    });
  };

  const handleRemoveImage = (index) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      attachments: newAttachments,
    });
    setImagePreviews(newImagePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'attachments') {
        formData.attachments.forEach(file => {
          formDataToSubmit.append('attachments', file);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post('/api/accidents', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccessMessage('Accident report created successfully!');
        setErrorMessage('');
        showAlert('Accident report created successfully!', 'Success');
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
          status: 'Line Manager Review',
          notifyManagement: false,
          additionalNotes: '',
        });
        setImagePreviews([]);
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
        <small>Only JPG, PNG, and GIF files are allowed. Max size: 2 MB each.</small>
        <div className="image-previews">
          {imagePreviews.map((src, index) => (
            <div key={index} className="preview-container">
              <img src={src} alt="Preview" className="preview-image" />
              <button type="button" className="remove-button" onClick={() => handleRemoveImage(index)}>×</button>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="supervisorComments">Supervisor’s Comments:</label>
        <textarea id="supervisorComments" name="supervisorComments" value={formData.supervisorComments} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange} required>
          <option value="Line Manager Review">Line Manager Review</option>
          <option value="Branch Manager Review">Branch Manager Review</option>
          <option value="QA Review">QA Review</option>
        </select>
      </div>
      <div className="form-buttons">
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setFormData({ ...formData, status: 'Draft' })}>Save as Draft</button>
      </div>
    </form>
  );
};

export default AccidentReportForm;