const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 120 },
  lastName: { type: String, required: true, maxlength: 120 },
  companyName: { type: String, required: true, maxlength: 120 },
  jobTitle: { type: String, maxlength: 120 },
  workEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);