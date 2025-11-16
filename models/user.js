import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 120 },
  lastName: { type: String, required: true, maxlength: 120 },
  companyName: { type: String, required: true, maxlength: 120 },
  jobTitle: { type: String, maxlength: 120 },
  workEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;