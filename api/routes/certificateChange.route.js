import express from 'express';
import { createCertificateChange, getCertificateChanges, getCertificateChangeById } from '../controllers/certificateChange.controller.js';

const router = express.Router();

// Route to create a new certificate change request
router.post('/certificate-changes', createCertificateChange);

// Route to get all certificate change requests
router.get('/certificate-changes', getCertificateChanges);

// Route to get a specific certificate change request by ID
router.get('/certificate-changes/:id', getCertificateChangeById);

export default router;