// src/utils/api.js
import axios from 'axios';

// Set the base URL to the backend URL
const api = axios.create({
  baseURL: 'https://gpsw.vercel.app/api', // Set your backend URL here
});

// Export the axios instance to use in other files
export default api;
