import express from 'express';
import { createAccident, getAccidents, getAccidentById } from '../controllers/accident.controller.js';

const router = express.Router();

// Route to create a new accident
router.post('/accidents', createAccident);

// Route to get all accidents
router.get('/accidents', getAccidents);

// Route to get an accident by its ID
router.get('/accidents/:id', getAccidentById); // This will handle the specific accident fetching by ID

export default router;
