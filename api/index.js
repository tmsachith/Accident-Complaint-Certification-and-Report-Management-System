import express from 'express'; // using express we can work with back end and the APIs
import mongoose from 'mongoose'; // using mongoose we can work with the database
import dotenv from 'dotenv'; // using dotenv we can work with the environment variables
import userRouter from './routes/user.route.js'; // using userRouter we can work with the user routes
import authRouter from './routes/auth.route.js';
dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000

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

app.use('/api/user', userRouter);

app.use('/api/auth', authRouter);
 