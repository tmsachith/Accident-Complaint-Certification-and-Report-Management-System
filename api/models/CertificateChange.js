import mongoose from 'mongoose';

const CertificateChangeSchema = new mongoose.Schema({
  requestId: { type: String, required: true },
  requestName: { type: String, required: true },
  changeDate: { type: Date, required: true },
  changeDescription: { type: String, required: true },
  requestedBy: { type: String, required: true },
  status: { type: String, default: 'Pending Review' },
  reviewedBy: { type: String },
  comments: { type: String },
  notifyStakeholders: { type: Boolean, default: false },
//   attachments: [String], // Array of file paths or URLs
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CertificateChange', CertificateChangeSchema);