import express from 'express';
import { createAccidentReport, getAccidentReports } from '../controllers/accident.controller.js';

const router = express.Router();

router.post('/accidents', createAccidentReport);  // Route to create a new accident report
router.get('/accidents', getAccidentReports);  // Route to get all accident reports

export default router;
