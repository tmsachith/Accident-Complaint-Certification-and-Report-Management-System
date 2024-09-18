import express from 'express';
import { signin, signup, verifyPassword, changePassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// Add new routes for password verification and change
router.post("/verify-password", verifyPassword);
router.post("/change-password", changePassword);

export default router;
