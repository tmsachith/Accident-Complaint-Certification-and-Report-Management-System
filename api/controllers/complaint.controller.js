import Complaint from '../models/complaint.model.js';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';

// Function to get all complaints
export const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch complaints', error });
    }
};

// Function to update reviewer note
export const updateReviewerNote = async (req, res) => {
    const { id, reviewerNote } = req.body;

    try {
        console.log("Received request to update reviewer note:", id, reviewerNote);
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            console.error("Complaint not found:", id);
            return res.status(404).json({ message: "Complaint not found" });
        }

        complaint.reviewerNote = reviewerNote;
        await complaint.save();

        console.log("Reviewer note updated successfully:", complaint);
        res.status(200).json({ message: "Reviewer note added successfully", complaint });
    } catch (error) {
        console.error("Error updating reviewer note:", error);
        res.status(500).json({ message: "Error updating reviewer note", error });
    }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const relativeDir = 'uploads/complaints/';
    const dir = path.join(__dirname, `../../client/src/${relativeDir}`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  }
});

export const upload = multer({ storage: storage });

export const addComplaint = async (req, res) => {
  const complaintData = req.body;
  const attachments = req.files.map(file => file.filename);

  try {
    const newComplaint = new Complaint({ ...complaintData, attachments });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully', complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit complaint', error });
  }
};

// Function to get a complaint by ID
export const getComplaintById = async (req, res) => {
    const { id } = req.params;
    try {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch complaint', error });
    }
};