import dao from './patient.dao';    



exports.getAll = async (req, res) => {
  try {
    const patients = await dao.get({});
    return res.json(patients);
  } catch (err) {
    console.error('getAll error:', err);
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
};



// controller.js (NEW)
exports.create = async (req, res) => {
  try {
    const payload = req.body; // optionally validate/whitelist fields here
    const created = await dao.create(payload);
    return res.status(201).json(created);
  } catch (err) {
    console.error('create error:', err);
    // Send 400 for validation errors, 500 for unexpected
    const code = err.name === 'ValidationError' ? 400 : 500;
    return res.status(code).json({ message: err.message || 'Error creating patient' });
  }
};


// exports.update= (req,res)=>{

//     var patient={
//         "age":req.body.age
//     }
//     dao.update({_id:req.params.id},patient,(err,patient)=>{
//         res.send("  Patient Updated Successfully    "); 
//     });
// }


exports.update = async (req, res) => {
  try {
    const updateData = {
      age: req.body.age,
      // whitelist other fields if needed
    };

    const updated = await dao.update(
      { _id: req.params.id },
      updateData, // plain object; DAO/model will wrap with $set
      { returnDocument: 'after', runValidators: true, context: 'query' }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // If you want to send a message only:
    // return res.json({ message: 'Patient updated successfully' });

    // Or send updated document:
    return res.json(updated);
  } catch (err) {
    console.error('update error:', err);
    const code = err.name === 'ValidationError' ? 400 : 500;
    return res.status(code).json({ message: err.message || 'Error updating patient' });
  }
};




exports.delete = async (query) => {
  // Returns { acknowledged: true, deletedCount: n }
  return await Patient.deleteOne(query);
};


exports.delete = async (req, res) => {
  try {
    const deleted = await dao.delete({ _id: req.params.id });

    if (!deleted) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Option A: return deleted doc
    return res.json(deleted);

    // Option B (idempotent style):
    // return res.status(204).send();
  } catch (err) {
    console.error('delete error:', err);
    return res.status(500).json({ message: err.message || 'Error deleting patient' });
  }
};
