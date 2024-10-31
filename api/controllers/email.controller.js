// controllers/email.controller.js
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Twilio Auth Token
const twilioClient = twilio(accountSid, authToken);

export const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  // Create a transporter object using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
};

// SMS function
export const sendSMS = async (req, res) => {
  const { to, message } = req.body;

  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to,
    });
    res.status(200).json({ success: true, message: 'SMS sent successfully!' });
  } catch (error) {
    console.error('Error sending SMS:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send SMS.' });
  }
};