import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class LoginController {
    async handle(request, h) {
        try {
            const { workEmail, password } = request.payload;
            const user = await User.findOne({ workEmail });
            if (!user) {
                return h.response({ error: 'Invalid email or password' }).code(401);
            }
            const validPass = await bcrypt.compare(password, user.password);
            if (!validPass) {
                return h.response({ error: 'Invalid email or password' }).code(401);
            }
            const token = jwt.sign(
                { id: user._id, email: user.workEmail },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return h.response({ token }).code(200);
        } catch (err) {
            return h.response({ error: err.message }).code(500);
        }
    }
}

export default new LoginController();
