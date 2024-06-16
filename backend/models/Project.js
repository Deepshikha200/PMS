const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamMemberSchema = new Schema({
  jobRole: { type: Schema.Types.ObjectId, ref: 'JobRole', required: true },
  empname: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  empid: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const projectSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  budget: { type: Number, required: true },
  team: [teamMemberSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
