import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import complaintRouter from './routes/complaint.route.js'; // Import complaint router
import notificationRouter from './routes/notification.route.js'; // Import notification router
import accidentRouter from './routes/accident.route.js'; // Import accident router
import certificateRouter from './routes/certificateChange.route.js';
import emailRouter from './routes/email.route.js'; // Import email router

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000; // Use PORT from environment variables or default to 5000

// MongoDB connection string from environment variables
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('Error: MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server only after successful connection to MongoDB
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
app.use('/api', complaintRouter); // Register complaint router
app.use('/api', notificationRouter); // Register notification router
app.use('/api', accidentRouter); // Register accident router
app.use('/api', certificateRouter);
app.use('/api', emailRouter); // Register email router

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