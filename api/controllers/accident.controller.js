import Accident from '../models/Accident.js';

// Controller to create a new accident report
export const createAccident = async (req, res) => {
  try {
    const newAccident = new Accident(req.body);
    await newAccident.save();
    res.status(201).json({ message: 'Accident report created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all accident reports
export const getAccidents = async (req, res) => {
  try {
    const accidents = await Accident.find().sort({ createdAt: -1 });
    res.json(accidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get an accident by ID
export const getAccidentById = async (req, res) => {
  const { id } = req.params;
  try {
    const accident = await Accident.findById(id);
    if (!accident) {
      return res.status(404).json({ message: 'Accident not found' });
    }
    res.json(accident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update an accident's comments and status
export const updateAccident = async (req, res) => {
  const { id } = req.params;
  const { comment, status } = req.body;

  try {
    const accident = await Accident.findById(id);
    if (!accident) {
      return res.status(404).json({ message: 'Accident not found' });
    }

    if (status === 'Branch Manager Review') {
      accident.lineManagerComments = comment;
    } else if (status === 'QA Review') {
      accident.branchManagerComments = comment;
    } else if (status === 'Approved') {
      accident.qaComments = comment;
    }

    accident.status = status;
    await accident.save();

    res.json({ message: 'Accident updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};