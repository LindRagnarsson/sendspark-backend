import listUsersController from '../../controllers/user/listUsers.Controller.js';
import { listUsersQuery, listUsersResponse } from './schemas/listUsers.Schema.js';

const listUsersRoute = {
    method: 'GET',
    path: '/users',
    options: {
        description: 'Get all users (paginated)',
        notes: 'Requires JWT. Use ?page=1&limit=50',
        tags: ['api', 'users'],
        auth: 'jwt',
        validate: {
            query: listUsersQuery
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: listUsersResponse
            }
        }
    },
    handler: listUsersController.handle,
};

export default listUsersRoute;
