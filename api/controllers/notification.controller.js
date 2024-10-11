import Notification from '../models/Notification.js';

// Controller to create a new notification
export const createNotification = async (req, res) => {
  try {
    const { type, title, description } = req.body;
    const uniqueId = `notif_${Date.now()}`; // Generate a unique ID

    // Create a new notification with additional fields
    const newNotification = new Notification({
      type,           // Type of notification
      title,          // Title for the notification
      description,    // Detailed description     // User's department
      uniqueId        // Unique identifier
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};