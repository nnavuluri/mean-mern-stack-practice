import dao from './clinicals.dao';
import mongodb from 'mongodb';
import mongoose from 'mongoose';


exports.getAll = async (req, res) => {
  try {
    const { patientId } = req.params;

    // (Optional) Validate the id format first
    if (!mongoose.isValidObjectId(patientId)) {
      return res.status(400).json({ message: 'Invalid patientId' });
    }

    // You can either let Mongoose cast automatically by passing the string:
    // const clinicalData = await dao.get({ patient: patientId });

    // Or explicitly cast:
    const clinicalData = await dao.get({ patient: new mongoose.Types.ObjectId(patientId) });

    return res.json(clinicalData);
  } catch (err) {
    console.error('getAll error:', err);
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
};



//create without callbacks and using async/await

exports.create = async (req, res) => {
    try {
        const payload = req.body;
        const created = await dao.create(payload);
        return res.status(201).json(created);
    } catch (err) {
        console.error('create error:', err);
        const code = err.name === 'ValidationError' ? 400 : 500;
        return res.status(code).json({ message: err.message || 'Error creating clinical data' });
    }
};  