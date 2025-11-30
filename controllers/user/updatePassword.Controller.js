import User from '../../models/user.js';
import bcrypt from 'bcryptjs';

class UpdatePasswordController {
    async handle(request, h) {
        try {
            // Get user ID from JWT token (set by auth strategy)
            const userId = request.auth.credentials.id;
            console.log('Password update attempt - User ID from token:', userId);

            const { currentPassword, newPassword } = request.payload;

            // Find user by ID
            const user = await User.findById(userId);
            if (!user) {
                console.log('Password update FAILED: User not found - ID:', userId);
                return h.response({ error: 'User not found' }).code(404);
            }

            console.log('Password update attempt - User:', user.workEmail, `(${user.firstName} ${user.lastName})`);

            // Verify current password (similar to login)
            const validPass = await bcrypt.compare(currentPassword, user.password);
            if (!validPass) {
                console.log('Password update FAILED: Invalid current password - User:', user.workEmail);
                return h.response({ error: 'Invalid current password' }).code(401);
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update password
            user.password = hashedPassword;
            await user.save();

            console.log('Password update SUCCESSFUL - User:', user.workEmail, `(${user.firstName} ${user.lastName})`);
            return h.response({ message: 'Password updated successfully' }).code(200);
        } catch (err) {
            console.log('Password update ERROR:', err.message);
            return h.response({ error: 'Could not update password' }).code(500);
        }
    }
}

export default new UpdatePasswordController();
