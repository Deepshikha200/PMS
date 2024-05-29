const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamMemberSchema = new Schema({
  jobRole: { type: String, required: true },
  team: { type: String, required: true },
  member: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Changed to ObjectId
});

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  budget: { type: Number, required: true },
  team: [TeamMemberSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Project', ProjectSchema);
