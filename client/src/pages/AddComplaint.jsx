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

  const brandOptions = ['Brand A', 'Brand B', 'Brand C'];
  const productOptions = {
    'Brand A': [{ name: 'Product A1', code: 'A1' }, { name: 'Product A2', code: 'A2' }],
    'Brand B': [{ name: 'Product B1', code: 'B1' }, { name: 'Product B2', code: 'B2' }],
    'Brand C': [{ name: 'Product C1', code: 'C1' }, { name: 'Product C2', code: 'C2' }]
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

      alert(rese.data.message);
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {step === 1 && (
        <div className="form-step">
          <h2>Customer Details</h2>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          <button type="button" onClick={nextStep}>Next</button>
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
          <button type="button" onClick={prevStep}>Back</button>
          <button type="button" onClick={nextStep}>Next</button>
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
          <button type="button" onClick={prevStep}>Back</button>
          <button type="submit">Submit Complaint</button>
        </div>
      )}
    </form>
  );
};

export default AddComplaint;