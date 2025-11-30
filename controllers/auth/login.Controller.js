import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (request, h) => {
    console.log('Login attempt:', request.payload);
    const { workEmail, password } = request.payload;
    const user = await User.findOne({ workEmail });
    if (!user) {
        console.log('Login failed: Invalid email or password');
        return h.response({ error: 'Invalid email or password' }).code(401);
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        console.log('Login failed: Invalid email or password');
        return h.response({ error: 'Invalid email or password' }).code(401);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful:', workEmail);
    return h.response({ token }).code(200);
};
