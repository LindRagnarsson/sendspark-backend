import User from '../../models/user.js';

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
