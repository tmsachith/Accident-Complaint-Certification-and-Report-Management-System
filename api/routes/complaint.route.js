import express from 'express';
import { getComplaints } from '../controllers/complaint.controller.js';

const router = express.Router();

router.get('/complaints', getComplaints);

export default router;
