import Accident from '../models/accident.model.js';

// Controller to create a new accident report
export const createAccidentReport = async (req, res) => {
  try {
    const { 
      employeeId, employeeName, department, position, 
      accidentDate, accidentTime, accidentLocation, 
      description, injuryType, severity, bodyPartAffected, 
      actionsTaken, reportedTo, witnesses, attachments, 
      supervisorComments 
    } = req.body;
    
    const newAccident = new Accident({
      employeeId,
      employeeName,
      department,
      position,
      accidentDate,
      accidentTime,
      accidentLocation,
      description,
      injuryType,
      severity,
      bodyPartAffected,
      actionsTaken,
      reportedTo,
      witnesses,
      attachments,  // Store Base64 strings
      supervisorComments
    });

    await newAccident.save();
    res.status(201).json({ message: 'Accident report created successfully' });
  } catch (error) {
    console.error('Error creating accident report:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all accident reports
export const getAccidentReports = async (req, res) => {
  try {
    const accidents = await Accident.find();
    res.json(accidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
