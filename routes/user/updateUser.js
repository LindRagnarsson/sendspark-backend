import { updateUser } from '../../controllers/user/updateUser.js';
import updateUserSchema from './schemas/updateUserSchema.js';
import Joi from 'joi';

const updateUserRoute = {
    method: 'PUT',
    path: '/users/{id}',
    options: {
        description: 'Update user by id',
        tags: ['api', 'users'],
        auth: 'jwt',
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('the user id')
            }),
            payload: updateUserSchema
        }
    },
    handler: updateUser
};

export default updateUserRoute;
