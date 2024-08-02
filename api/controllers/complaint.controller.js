import Complaint from '../models/complaint.model.js';

// Get all complaints
export const getComplaints = async (req, res, next) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        next(error);
    }
};
