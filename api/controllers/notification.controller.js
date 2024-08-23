import Notification from '../models/Notification.js';

// Controller to create a new notification
export const createNotification = async (req, res) => {
  try {
    const { fullname, position, department } = req.body;  // Include department if needed
    const uniqueId = `notif_${Date.now()}`; // Generate a unique ID

    // Create a new notification with additional fields
    const newNotification = new Notification({
      type: 'Signup Notification',  // Type of notification
      title: 'Added new user',       // Title for the notification
      description: `User ${fullname}, Position: ${position}, Department: ${department}`, // Detailed description
      fullname,                      // User's full name
      position,                      // User's position
      uniqueId                       // Unique identifier
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
