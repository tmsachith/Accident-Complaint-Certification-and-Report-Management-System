import express from 'express';
import { getComplaints, updateReviewerNote } from '../controllers/complaint.controller.js';

const router = express.Router();

// Route to get all complaints
router.get('/complaints', getComplaints);

// New route to update reviewer note
router.post('/complaints/reviewer-note', updateReviewerNote);

export default router;
