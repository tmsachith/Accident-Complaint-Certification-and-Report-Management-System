import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    name: String,
    contactInfo: String,
    address: String,
    brandName: String,
    productName: String,
    productCode: String,
    batchNumber: String,
    expirationDate: Date,
    purchaseDate: Date,
    purchasePlace: String,
    issueTitle: String,
    issueDescription: String,
    issueDate: Date,
    storageInfo: String,
    healthEffects: String,
    desiredResolution: String,
    additionalComments: String,
    reviewerNote: String, // New field added
    attachments: [String], // Array of attachment filenames
    status: { type: String, default: "Pending" } // New status field with default value "Pending"
}, { timestamps: true });

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
