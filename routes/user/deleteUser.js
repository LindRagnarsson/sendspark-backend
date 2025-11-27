import { deleteUser } from '../../controllers/user/deleteUser.js';
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
        }
    },
    handler: deleteUser
};

export default deleteUserRoute;
