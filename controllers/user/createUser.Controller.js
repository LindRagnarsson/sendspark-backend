import User from '../../models/user.js';
import bcrypt from 'bcryptjs';

class CreateUserController {
    async handle(request, h) {
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
    }
}

export default new CreateUserController();
