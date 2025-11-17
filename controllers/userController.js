import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const createUser = async (request, h) => {
  try {
    const { firstName, lastName, companyName, jobTitle, workEmail, password } = request.payload;
    const exists = await User.findOne({ workEmail });
    if (exists) {
      return h.response({ error: 'Email already exists.' }).code(400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName, lastName, companyName, jobTitle, workEmail, password: hashedPassword
    });
    await user.save();
    const objUser = user.toObject();
    delete objUser.password;
    return h.response({ user: objUser }).code(201);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

// Update user by ID
export const updateUser = async (request, h) => {
  const userId = request.params.id;
  const updateData = request.payload;

  try {
    // Do not allow updating the email, remove it if present
    if (updateData.workEmail) {
      delete updateData.workEmail;
    }

    // Update user and return the new document
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return h.response({ error: 'User not found' }).code(404);
    }

    // Remove password from response
    const userObject = updatedUser.toObject();
    delete userObject.password;

    return h.response({ user: userObject }).code(200);
  } catch (err) {
    return h.response({ error: 'Could not update user' }).code(500);
  }
};

// Delete user by ID
export const deleteUser = async (request, h) => {
  const userId = request.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return h.response({ error: 'User not found' }).code(404);
    }

    return h.response({ message: 'User deleted' }).code(200);
  } catch (err) {
    return h.response({ error: 'Could not delete user' }).code(500);
  }
};


// List users with pagination
export const listUsers = async (request, h) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 50;

  const users = await User.find()
    .select('-password') // Exclude password field
    .skip((page - 1) * limit)
    .limit(limit);

  // Total users count for pagination
  const total = await User.countDocuments();
  return h.response({
    users,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit)
    }
  }).code(200);
};