const mongoose = require('mongoose');

// Define enum values for the jobRole field
const jobRoleEnum = ['tpm', 'pm', 'ba', 'qa', 'devoops', 'developer', 'tl', 'ui/ux'];

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /@antiersolutions\.com$/.test(v); // Ensure the email ends with @antiersolutions.com
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  phoneNo: {
    type: String,
    required: true
  },
  jobRole: {
    type: String,
    enum: jobRoleEnum, // Use the enum values here
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


// Create and export the User model
module.exports = mongoose.model('User', userSchema);
