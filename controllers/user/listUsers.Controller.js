import User from '../../models/user.js';

class ListUsersController {
    // List users with pagination
    async handle(request, h) {
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
    }
}

export default new ListUsersController();
