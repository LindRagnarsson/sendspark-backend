import { deleteUser } from '../../controllers/user/deleteUser.Controller.js';
import Joi from 'joi';

const deleteUserRoute = {
    method: 'DELETE',
    path: '/users/{id}',
    options: {
        description: 'Delete user by id',
        tags: ['api', 'users'],
        auth: 'jwt',
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('the user id')
            })
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: {
                    200: {
                        description: 'User deleted',
                        schema: Joi.object({
                            message: Joi.string().example('User deleted')
                        })
                    },
                    404: {
                        description: 'User not found'
                    },
                    500: {
                        description: 'Server error'
                    }
                }
            }
        }
    },
    handler: deleteUser
};

export default deleteUserRoute;
