import Complaint from '../models/complaint.model.js';

// Function to get all complaints
export const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch complaints', error });
    }
};

// Function to update reviewer note
export const updateReviewerNote = async (req, res) => {
    const { id, reviewerNote } = req.body;

    try {
        console.log("Received request to update reviewer note:", id, reviewerNote);
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            console.error("Complaint not found:", id);
            return res.status(404).json({ message: "Complaint not found" });
        }

        complaint.reviewerNote = reviewerNote;
        await complaint.save();

        console.log("Reviewer note updated successfully:", complaint);
        res.status(200).json({ message: "Reviewer note added successfully", complaint });
    } catch (error) {
        console.error("Error updating reviewer note:", error);
        res.status(500).json({ message: "Error updating reviewer note", error });
    }
};
