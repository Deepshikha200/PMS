
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator: function (v) {
//         return /@antiersolutions\.com$/.test(v); // Ensure the email ends with @antiersolutions.com
//       },
//       message: props => `${props.value} is not a valid email!`
//     }
//   },
//   phoneNo: {
//     type: String,
//     required: true
//   },
//   jobRole: {
//     type: String,
//     enum: ['TPM', 'PM', 'BA', 'QA', 'DEVOPS', 'DEVELOPER', 'TL', 'UI/UX'], // Capitalize job roles
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
//   team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
// });

// // Custom setter function to capitalize job role before saving
// userSchema.path('jobRole').set(function (value) {
//   return value.toUpperCase();
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

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
  jobRole: { type: mongoose.Schema.Types.ObjectId, ref: 'JobRole', required: true },

  password: {
    type: String,
    required: true
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

module.exports = mongoose.model('User', userSchema);
