import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import complaintRouter from './routes/complaint.route.js';
import notificationRouter from './routes/notification.route.js';
import accidentRouter from './routes/accident.route.js';
import certificateRouter from './routes/certificateChange.route.js';
import emailRouter from './routes/email.route.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL; // Get FRONTEND_URL from environment variables

// Add CORS middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true, // If you need to send cookies
}));

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('Error: MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Register routers
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api', complaintRouter);
app.use('/api', notificationRouter);
app.use('/api', accidentRouter);
app.use('/api', certificateRouter);
app.use('/api', emailRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong! / internal server error';
  if (res.headersSent) {
    return next(err);
  }
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});