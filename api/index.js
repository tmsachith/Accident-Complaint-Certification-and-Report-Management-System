import express from 'express'; // using express we can work with back end and the APIs
import mongoose from 'mongoose'; // using mongoose we can work with the database
import dotenv from 'dotenv'; // using dotenv we can work with the environment variables

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000

// MongoDB connection string from environment variables
const mongoURI = process.env.MONGODB_URI ;

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
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});
