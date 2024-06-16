
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  projectName: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeName: { type: String, required: true },
  jobRole: { type: String, required: true },
  date: { type: Date, required: true },
  logHours: { type: String, required: true },
  remarks: { type: String, required: false },
});

module.exports = mongoose.model('Report', reportSchema);
