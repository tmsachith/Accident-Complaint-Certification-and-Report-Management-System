import Complaint from '../models/complaint.model.js';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

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
    const { id, reviewerNote, status } = req.body;
  
    try {
      const complaint = await Complaint.findById(id);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }
  
      complaint.reviewerNote = reviewerNote;
      complaint.status = status;
      await complaint.save();
  
      res.status(200).json({ message: "Reviewer note added and status updated successfully", complaint });
    } catch (error) {
      res.status(500).json({ message: "Error updating reviewer note", error });
    }
  };

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dvijdm1ti',
  api_key: '921332166373589',
  api_secret: 'IvFV5OMPw49p7JDaYYe_IbJ6MjY',
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'complaints', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

export const upload = multer({ storage: storage });

export const addComplaint = async (req, res) => {
  const complaintData = req.body;
  const attachments = req.files.map(file => file.path); // Cloudinary URL of the file

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