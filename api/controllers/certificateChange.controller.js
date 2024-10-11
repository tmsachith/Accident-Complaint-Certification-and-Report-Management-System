import CertificateChange from '../models/CertificateChange.js';

// Create a new certificate change request
export const createCertificateChange = async (req, res) => {
  try {
    const newCertificateChange = new CertificateChange(req.body);
    await newCertificateChange.save();
    res.status(201).json({ message: 'Certificate change request created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all certificate change requests
export const getCertificateChanges = async (req, res) => {
  try {
    const certificateChanges = await CertificateChange.find().sort({ changeDate: -1 });
    res.json(certificateChanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a certificate change request by ID
export const getCertificateChangeById = async (req, res) => {
  const { id } = req.params;
  try {
    const certificateChange = await CertificateChange.findById(id);
    if (!certificateChange) {
      return res.status(404).json({ message: 'Certificate change request not found' });
    }
    res.json(certificateChange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};