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
// Controller to get all accident reports with the latest one on top
export const getAccidents = async (req, res) => {
  try {
    // Fetch accidents sorted by date in descending order
    const accidents = await Accident.find().sort({ date: -1 });
    res.json(accidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAccidentById = async (req, res) => {
  const { id } = req.params;
  console.log('Accident ID received in request:', id); // Log the ID

  try {
    const accident = await Accident.findById(id);
    if (!accident) {
      console.log('Accident not found with ID:', id); // Log if accident is not found
      return res.status(404).json({ message: 'Accident not found' });
    }
    res.json(accident);
  } catch (error) {
    console.error('Error fetching accident:', error); // Log error
    res.status(500).json({ message: error.message });
  }
};

