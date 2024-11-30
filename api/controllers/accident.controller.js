import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Accident from '../models/Accident.js';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvijdm1ti', // Replace with your Cloudinary cloud name
  api_key: '921332166373589', // Replace with your Cloudinary API key
  api_secret: 'IvFV5OMPw49p7JDaYYe_IbJ6MjY', // Replace with your Cloudinary API secret
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'accidents', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
  },
});

const upload = multer({ storage: storage });

// Controller to create a new accident report
export const createAccident = async (req, res) => {
  try {
    // Map the uploaded files to their Cloudinary URLs
    const attachments = req.files.map(file => file.path); // Each file's `path` contains the Cloudinary URL
    
    // Create a new accident report with the provided data and attachments
    const newAccident = new Accident({ 
      ...req.body, 
      attachments, // Save the Cloudinary URLs for the uploaded files
    });

    await newAccident.save();

    res.status(201).json({ message: 'Accident report created successfully', accident: newAccident });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get all accident reports
export const getAccidents = async (req, res) => {
  try {
    const accidents = await Accident.find().sort({ createdAt: -1 });
    res.json(accidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get an accident by ID
export const getAccidentById = async (req, res) => {
  const { id } = req.params;
  try {
    const accident = await Accident.findById(id);
    if (!accident) {
      return res.status(404).json({ message: 'Accident not found' });
    }
    res.json(accident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update an accident's comments and status
export const updateAccident = async (req, res) => {
  const { id } = req.params;
  const { comment, status } = req.body;

  try {
    const accident = await Accident.findById(id);
    if (!accident) {
      return res.status(404).json({ message: 'Accident not found' });
    }

    if (status === 'Branch Manager Review') {
      accident.lineManagerComments = comment;
    } else if (status === 'QA Review') {
      accident.branchManagerComments = comment;
    } else if (status === 'Approved') {
      accident.qaComments = comment;
    }

    accident.status = status;
    await accident.save();

    res.json({ message: 'Accident updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { upload };