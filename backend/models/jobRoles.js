const mongoose = require('mongoose');

const jobRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true // Ensure job roles are stored in uppercase
  }
});

module.exports = mongoose.model('JobRole', jobRoleSchema);
