const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.createUser = async (request, h) => {
  try {
    const { firstName, lastName, companyName, jobTitle, workEmail, password } = request.payload;

    // Verificates if email already exists
    const exists = await User.findOne({ workEmail });
    if (exists) {
      return h.response({ error: 'Email already exists.' }).code(400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creates and saves user to mongoDB
    const user = new User({
      firstName,
      lastName,
      companyName,
      jobTitle,
      workEmail,
      password: hashedPassword
    });
    await user.save();

    // Does not return password field
    const objUser = user.toObject();
    delete objUser.password;

    return h.response({ user: objUser }).code(201);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};