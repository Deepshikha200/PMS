const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  projectName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  employeeName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  logHours: {
    type: String,
    required: true,
    match: /^([01]?[0-9]|2[0-3])\.[0-5][0-9]$/,
  },
  remarks: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
