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
  jobRole: { type: mongoose.Schema.Types.ObjectId, ref: 'JobRole', required: true },

  password: {
    type: String,
    required: true
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

module.exports = mongoose.model('User', userSchema);
