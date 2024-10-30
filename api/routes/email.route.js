// routes/email.route.js
import express from 'express';
import { sendEmail } from '../controllers/email.controller.js'; // Assuming you have a controller file for email

const router = express.Router();

router.post('/send-email', sendEmail); // Defining the email sending route

// router.post('/send-email', async (req, res) => {
//     const { to, subject, text } = req.body;
//     try {
//       await sendEmail({ to, subject, text });
//       res.status(200).json({ success: true, message: 'Email sent successfully!' });
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Failed to send email.' });
//     }
//   });
  

export default router;
