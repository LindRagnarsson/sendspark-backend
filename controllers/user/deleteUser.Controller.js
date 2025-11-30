import User from '../../models/user.js';

class DeleteUserController {
    // Delete user by ID
    async handle(request, h) {
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
    }
}

export default new DeleteUserController();
