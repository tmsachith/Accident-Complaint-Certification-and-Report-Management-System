import mongoose from 'mongoose';

const AccidentSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  accidentDate: { type: Date, required: true },
  accidentTime: { type: String, required: true },
  accidentLocation: { type: String, required: true },
  description: { type: String, required: true },
  injuryType: { type: String, required: true },
  severity: { type: String, required: true },
  bodyPartAffected: { type: String, required: true },
  actionsTaken: { type: String, required: true },
  reportedTo: { type: String, required: true },
  witnesses: { type: String },
  witnessContact: { type: String },
  attachments: [String],
  supervisorComments: { type: String },
  lineManagerComments: { type: String },
  branchManagerComments: { type: String },
  qaComments: { type: String },
  status: { type: String, default: 'Pending Review' },
  notifyManagement: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Accident', AccidentSchema);