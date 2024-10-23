import express from 'express';
import {
  upload,
  createAccident,
  getAccidents,
  getAccidentById,
  updateAccident
} from '../controllers/accident.controller.js';

const router = express.Router();

// Route to create a new accident
router.post('/accidents', upload.array('attachments'), createAccident);

// Route to get all accidents
router.get('/accidents', getAccidents);

// Route to get an accident by its ID
router.get('/accidents/:id', getAccidentById);

// Route to update an accident's comments and status
router.put('/accidents/:id', updateAccident);

export default router;