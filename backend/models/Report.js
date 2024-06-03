const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  projectName: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  employeeName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jobRole: { type: String }, // Adjust the type based on your requirements
  date: { type: Date },
  shiftStart: { type: String },
  shiftEnd: { type: String },
  remarks: { type: String }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

