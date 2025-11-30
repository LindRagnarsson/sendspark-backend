import { updateUser } from '../../controllers/user/updateUser.Controller.js';
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
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: {
                    200: {
                        description: 'User updated',
                        schema: Joi.object({
                            user: Joi.object().label('User')
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
    handler: updateUser
};

export default updateUserRoute;
