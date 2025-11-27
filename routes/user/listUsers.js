import { listUsers } from '../../controllers/user/listUsers.js';

const listUsersRoute = {
    method: 'GET',
    path: '/users',
    options: {
        description: 'Get all users (paginated)',
        notes: 'Requires JWT. Use ?page=1&limit=50',
        tags: ['api', 'users'],
        auth: 'jwt'
    },
    handler: listUsers,
};

export default listUsersRoute;
