import express from 'express';
import { createNotification, getNotifications } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/notifications', createNotification);
router.get('/notifications', getNotifications); // Add this line

export default router;
