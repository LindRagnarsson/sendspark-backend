import User from '../../models/user.js';

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
