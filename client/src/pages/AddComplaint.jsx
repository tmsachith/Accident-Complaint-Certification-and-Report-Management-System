import React, { useState } from 'react';
import axios from 'axios';
import './AddComplaint.css';

const AddComplaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    address: '',
    brandName: '',
    productName: '',
    productCode: '',
    batchNumber: '',
    expirationDate: '',
    purchaseDate: '',
    purchasePlace: '',
    issueTitle: '',
    issueDescription: '',
    issueDate: '',
    storageInfo: '',
    healthEffects: '',
    desiredResolution: '',
    additionalComments: ''
  });

  const [attachments, setAttachments] = useState([]);
  const [step, setStep] = useState(1);
  const [statusPopup, setStatusPopup] = useState({ show: false, message: '', success: null });

  const brandOptions = ['Black Tea Grades', 'Green Tea Grades', 'Spices Whole','Spices Tea Bag Cut (TBC)','Spices Powder'];
  const productOptions = {
    'Black Tea Grades': [
        { name: 'OP', code: 'OP' },
        { name: 'Flowery Pekoe', code: 'FP' },
        { name: 'Pekoe', code: 'PK' },
        { name: 'FBOP', code: 'FBOP' },  // Added FBOP
        { name: 'BOP', code: 'BOP' },    // Added BOP
        { name: 'BOPF', code: 'BOPF' },  // Added BOPF
        { name: 'Dust1', code: 'D1' }    // Added Dust1
    ],
    'Green Tea Grades': [
        { name: 'BT1', code: 'BT1' },          // Added BT1
        { name: 'CB1SP', code: 'CB1SP' },      // Added CB1SP
        { name: 'Green Fannings', code: 'GF' }, // Added Green Fannings
        { name: 'BT2', code: 'BT2' },          // Added BT2
        { name: 'BT3', code: 'BT3' },          // Added BT3
        { name: 'CBSP', code: 'CBSP' },        // Added CBSP
        { name: 'CB', code: 'CB' },            // Added CB
        { name: 'Dust1', code: 'D1' }          // Added Dust1
    ],
    'Spices Whole': [
        { name: 'Black Pepper', code: 'BP' },      // Added Black Pepper
        { name: 'Cardamom Pods', code: 'CP' },     // Added Cardamom Pods
        { name: 'Chilli', code: 'CH' },             // Added Chilli
        { name: 'Cinnamon Quills', code: 'CQ' },   // Added Cinnamon Quills
        { name: 'Clove Pods', code: 'CLP' },        // Added Clove Pods
        { name: 'Ginger Pieces', code: 'GP' },      // Added Ginger Pieces
        { name: 'Cardamom Seeds', code: 'CS' },     // Added Cardamom Seeds
        { name: 'Mace Red', code: 'MR' },           // Added Mace Red
        { name: 'Nutmeg', code: 'NUT' },            // Added Nutmeg
        { name: 'Vanilla Beans', code: 'VB' },      // Added Vanilla Beans
        { name: 'White Pepper', code: 'WP' },       // Added White Pepper
        { name: 'Turmeric', code: 'TUR' }           // Added Turmeric
    ],
    // New category added here
    'Spices Tea Bag Cut (TBC)': [
        { name: 'Black Pepper TBC', code: 'BPTBC' },  // Added Black Pepper TBC
        { name: 'Cardamom TBC', code: 'CTBC' },       // Added Cardamom TBC
        { name: 'Clove TBC', code: 'CTBC2' },          // Added Clove TBC
        { name: 'Ginger TBC', code: 'GTBC' },          // Added Ginger TBC
        { name: 'Lemongrass TBC', code: 'LTBC' },      // Added Lemongrass TBC
        { name: 'Nutmeg TBC', code: 'NTBC' }           // Added Nutmeg TBC
    ],
    // New category added here
    'Spices Powder': [
        { name: 'Black Pepper Powder', code: 'BPP' },   // Added Black Pepper Powder
        { name: 'Ginger Powder', code: 'GPW' },          // Added Ginger Powder
        { name: 'Clove Powder', code: 'CPW' },           // Added Clove Powder
        { name: 'Chilli Powder', code: 'CHPW' },         // Added Chilli Powder
        { name: 'Mace Powder', code: 'MPW' },            // Added Mace Powder
        { name: 'Nutmeg Powder', code: 'NPW' },          // Added Nutmeg Powder
        { name: 'Turmeric Powder', code: 'TPW' },        // Added Turmeric Powder
        { name: 'White Pepper Powder', code: 'WPPW' },   // Added White Pepper Powder
        { name: 'Cinnamon Powder', code: 'CPW2' }         // Added Cinnamon Powder
    ]
  };
  const purchasePlaces = ['Online Store', 'Local Market', 'International Shop'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBrandChange = (e) => {
    const brandName = e.target.value;
    setFormData({ ...formData, brandName, productName: '', productCode: '' });
  };

  const handleProductChange = (e) => {
    const productName = e.target.value;
    const product = productOptions[formData.brandName]?.find(p => p.name === productName);
    setFormData({ ...formData, productName, productCode: product ? product.code : '' });
  };

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  const removeAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusPopup({ show: true, message: 'Submitting your complaint...', success: null });
    const formDataWithFiles = new FormData();
    Object.keys(formData).forEach(key => {
      formDataWithFiles.append(key, formData[key]);
    });
    attachments.forEach(file => {
      formDataWithFiles.append('attachments', file);
    });

    try {
      const response = await axios.post(import.meta.env.BASE_URL+'/api/complaints', formDataWithFiles, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const emailContent = `
      Hello ${formData.name},

      Thank you for submitting your complaint. Here are the details you provided:

      Customer Details:
      - Name: ${formData.name}
      - Contact Info: ${formData.contactInfo}
      - Address: ${formData.address}

      Product Details:
      - Brand Name: ${formData.brandName}
      - Product Name: ${formData.productName}
      - Product Code: ${formData.productCode}
      - Batch Number: ${formData.batchNumber}
      - Expiration Date: ${formData.expirationDate}
      - Purchase Date: ${formData.purchaseDate}
      - Purchase Place: ${formData.purchasePlace}

      Complaint Details:
      - Issue Title: ${formData.issueTitle}
      - Issue Description: ${formData.issueDescription}
      - Issue Date: ${formData.issueDate}
      - Storage Info: ${formData.storageInfo}
      - Health Effects: ${formData.healthEffects}
      - Desired Resolution: ${formData.desiredResolution}
      - Additional Comments: ${formData.additionalComments}

      Our team will review your complaint and get back to you shortly.

      Best regards,
      Bio Foods (PVT) LTD
    `;

      const rese = await axios.post(import.meta.env.BASE_URL+'/api/send-email', {
        to: formData.contactInfo,
        subject: 'Complaint Report',
        text: emailContent
      });

      setStatusPopup({ show: true, message: 'Complaint submitted successfully!', success: true });
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setStatusPopup({ show: true, message: 'An error occurred. Please try again.', success: false });
    }
  };

  const closePopup = () => {
    setStatusPopup({ show: false, message: '', success: null });
    if (statusPopup.success) {
      window.location.reload();
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Step Indicator */}
      <div className="step-indicator">
        <div className={`step ${step === 1 ? 'active-step' : ''}`}>1</div>
        <div className={`step ${step === 2 ? 'active-step' : ''}`}>2</div>
        <div className={`step ${step === 3 ? 'active-step' : ''}`}>3</div>
      </div>
  
      {/* Form Steps */}
      {step === 1 && (
        <div className="form-step">
          <h2>Customer Details</h2>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="email" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        </div>
      )}
      {step === 2 && (
        <div className="form-step">
          <h2>Product Details</h2>
          <select name="brandName" value={formData.brandName} onChange={handleBrandChange} required>
            <option value="" disabled>Select Brand</option>
            {brandOptions.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
          <select name="productName" value={formData.productName} onChange={handleProductChange} disabled={!formData.brandName} required>
            <option value="" disabled>Select Product</option>
            {formData.brandName && productOptions[formData.brandName].map((product, index) => (
              <option key={index} value={product.name}>{product.name}</option>
            ))}
          </select>
          <input type="text" name="productCode" value={formData.productCode} placeholder="Product Code" readOnly />
          <input type="text" name="batchNumber" value={formData.batchNumber} onChange={handleChange} placeholder="Batch Number" />
          <label>
            Expiration Date
            <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
          </label>
          <label>
            Purchase Date
            <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
          </label>
          <select name="purchasePlace" value={formData.purchasePlace} onChange={handleChange} required>
            <option value="" disabled>Select Purchase Place</option>
            {purchasePlaces.map((place, index) => (
              <option key={index} value={place}>{place}</option>
            ))}
          </select>
        </div>
      )}
      {step === 3 && (
        <div className="form-step">
          <h2>Complaint Details</h2>
          <input type="text" name="issueTitle" value={formData.issueTitle} onChange={handleChange} placeholder="Issue Title" required />
          <textarea name="issueDescription" value={formData.issueDescription} onChange={handleChange} placeholder="Issue Description" required></textarea>
          <label>
            Issue Date
            <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} />
          </label>
          <input type="text" name="storageInfo" value={formData.storageInfo} onChange={handleChange} placeholder="Storage Info" />
          <input type="text" name="healthEffects" value={formData.healthEffects} onChange={handleChange} placeholder="Health Effects" />
          <input type="text" name="desiredResolution" value={formData.desiredResolution} onChange={handleChange} placeholder="Desired Resolution" />
          <textarea name="additionalComments" value={formData.additionalComments} onChange={handleChange} placeholder="Additional Comments"></textarea>
          <input type="file" multiple onChange={handleFileChange} accept="image/*" />
          <div className="attachment-preview">
            {attachments.map((file, index) => (
              <div key={index} className="attachment-item">
                <img src={URL.createObjectURL(file)} alt={`Attachment ${index}`} className="attachment-image" />
                <button type="button" onClick={() => removeAttachment(index)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
  
      {statusPopup.show && (
        <div className="popup-container">
          <div className="popup-card">
            <p>{statusPopup.message}</p>
            {statusPopup.success !== null && (
              <button onClick={closePopup}>{statusPopup.success ? 'Done' : 'Close'}</button>
            )}
          </div>
        </div>
      )}
  
      <div className="form-navigation">
        {step > 1 && <button type="button" className="back-button" onClick={prevStep}>Back</button>}
        {step < 3 && <button type="button" className="next-button" onClick={nextStep}>Next</button>}
        {step === 3 && <button type="submit" className="submit-button">Submit Complaint</button>}
      </div>
    </form>
  );
};

export default AddComplaint;