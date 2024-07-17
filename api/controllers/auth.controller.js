import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Creating a new User instance with an object
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        // Send an error response in case of failure
        next(errorHandler(550,'error from the function'));//custon error
    }
};
