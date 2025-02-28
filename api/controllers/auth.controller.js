import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const {
      username, email, password, nic, fullname, position,
      phone, address, department, dob
    } = req.body;

    // Validate input
    if (
      !username || !email || !password || !nic || !fullname || 
      !position || !phone || !address || !department || !dob
    ) {
      return next(errorHandler(400, 'All fields are required.'));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, 'User with this email already exists.'));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new User instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      nic,
      fullname,
      position,
      phone,
      address,
      department,
      dob
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Send an error response in case of failure
    next(errorHandler(500, 'Registration failed. Please try again.'));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Validate input
    if (!email || !password) {
      return next(errorHandler(400, 'Email and password are required.'));
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Validate password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, 'Invalid credentials.'));
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Remove password from user object before sending response
    const { password: pass, username, position } = user._doc;

    // Send response with token and user info (username and position)
    res.cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({
        token,          // JWT token
        username,       // User's username
        position        // User's position
      });
  } catch (error) {
    next(errorHandler(500, 'Sign in failed. Please try again.'));
  }
};

// Verify Current Password
export const verifyPassword = async (req, res, next) => {
  const { email, currentPassword } = req.body;
  try {
    // Validate input
    if (!email || !currentPassword) {
      return next(errorHandler(400, 'Email and current password are required.'));
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Validate password
    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, 'Invalid current password.'));
    }

    // Send success response if password is valid
    res.status(200).json({ message: 'Current password is valid' });
  } catch (error) {
    next(errorHandler(500, 'Password verification failed. Please try again.'));
  }
};

// Update Password
export const changePassword = async (req, res, next) => {
  const { email, newPassword } = req.body;
  try {
    // Validate input
    if (!email || !newPassword) {
      return next(errorHandler(400, 'Email and new password are required.'));
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Hash new password and update user record
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;

    // Save updated user to the database
    await user.save();

    // Send success response
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    next(errorHandler(500, 'Password update failed. Please try again.'));
  }
};

