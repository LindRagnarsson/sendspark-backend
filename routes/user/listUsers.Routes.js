import { listUsers } from '../../controllers/user/listUsers.Controller.js';
import Joi from 'joi';

const listUsersRoute = {
    method: 'GET',
    path: '/users',
    options: {
        description: 'Get all users (paginated)',
        notes: 'Requires JWT. Use ?page=1&limit=50',
        tags: ['api', 'users'],
        auth: 'jwt',
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: {
                    200: {
                        description: 'List of users',
                        schema: Joi.object({
                            users: Joi.array().items(Joi.object()).label('Users'),
                            pagination: Joi.object({
                                total: Joi.number(),
                                page: Joi.number(),
                                pages: Joi.number()
                            }).label('Pagination')
                        })
                    },
                    500: {
                        description: 'Server error'
                    }
                }
            }
        }
    },
    handler: listUsers,
};

export default listUsersRoute;
