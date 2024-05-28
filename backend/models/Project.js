const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Start', 'Active', 'Completed'], required: true },
  hourlyRate: { type: Number, required: true },
  budget: { type: Number, required: true },
  team: [
    {
      jobRole: { type: String, required: true },
      team: { type: String, required: true },
      member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    }
  ]
});

module.exports = mongoose.model('Project', projectSchema);
