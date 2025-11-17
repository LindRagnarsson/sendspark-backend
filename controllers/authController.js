import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (request, h) => {
  const { workEmail, password } = request.payload;
  const user = await User.findOne({ workEmail });
  if (!user) return h.response({ error: 'Invalid email or password' }).code(401);

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return h.response({ error: 'Invalid email or password' }).code(401);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return h.response({ token }).code(200);
};