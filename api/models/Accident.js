import mongoose from 'mongoose';

const AccidentSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  accidentDate: { type: Date, required: true },
  accidentTime: { type: String, required: true }, // Store as string (HH:mm) or use Date if needed
  accidentLocation: { type: String, required: true },
  description: { type: String, required: true },
  injuryType: { type: String, required: true },
  severity: { type: String, required: true },
  bodyPartAffected: { type: String, required: true },
  actionsTaken: { type: String, required: true },
  reportedTo: { type: String, required: true },
  witnesses: { type: String },
  witnessContact: { type: String },
  attachments: [String], // Array of Base64 strings
  supervisorComments: { type: String },
  status: { type: String, default: 'Pending Review' },
  notifyManagement: { type: Boolean, default: false },
  additionalNotes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Accident', AccidentSchema);
