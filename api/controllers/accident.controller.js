import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Accident from '../models/Accident.js';

// Get __filename and __dirname equivalent for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const relativeDir = 'uploads/accidents/';  // Only this part will be stored in DB
    const dir = path.join(__dirname, `../../client/src/${relativeDir}`);
    
    // Ensure the directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);  // Save the file in the full directory on disk
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);  // Use timestamp-based filename

    // Save the relative directory and file name separately for database use
    req.savedFileName = filename;  // Save only the file name (not the full path)
  }
});

const upload = multer({ storage: storage });

// Controller to create a new accident report
export const createAccident = async (req, res) => {
  try {
    const attachments = req.files.map(file => req.savedFileName); // Only save the file name (e.g., filename.jpg)
    
    const newAccident = new Accident({ 
      ...req.body, 
      attachments // Save array of filenames without the path
    });
    
    await newAccident.save();
    
    res.status(201).json({ message: 'Accident report created successfully' });
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