const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  empname: {
    type: String,
    required: true
  },
  empid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  jobRole: { type: mongoose.Schema.Types.ObjectId, ref: 'JobRole', required: true },

  password: {
    type: String,
    required: true
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }]

});

module.exports = mongoose.model('User', userSchema);
