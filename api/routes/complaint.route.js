import express from 'express';
import { getComplaints, updateReviewerNote, addComplaint, upload, getComplaintById } from '../controllers/complaint.controller.js';

const router = express.Router();

router.get('/complaints', getComplaints);
router.get('/complaints/:id', getComplaintById); // Get complaint by ID
router.post('/complaints/reviewer-note', updateReviewerNote);
router.post('/complaints', upload.array('attachments'), addComplaint);

export default router;