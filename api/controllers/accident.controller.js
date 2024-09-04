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
    const accidents = await Accident.find();
    res.json(accidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
