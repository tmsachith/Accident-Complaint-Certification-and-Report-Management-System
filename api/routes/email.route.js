// routes/email.route.js
import express from 'express';
import { sendEmail } from '../controllers/email.controller.js'; // Assuming you have a controller file for email

const router = express.Router();

router.post('/send-email', sendEmail); // Defining the email sending route

export default router;
