import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  type: { type: String, required: true },  // Type of notification
  title: { type: String, required: true },  // Title of notification
  description: { type: String, required: true },  // Detailed description
  uniqueId: { type: String, required: true },  // Unique identifier
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', NotificationSchema);
