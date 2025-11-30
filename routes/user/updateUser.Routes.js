import { updateUser } from '../../controllers/user/updateUser.Controller.js';
import { updateUserParams, updateUserPayload, updateUserResponse } from './schemas/updateUser.Schema.js';

const updateUserRoute = {
    method: 'PUT',
    path: '/users/{id}',
    options: {
        description: 'Update user by id',
        tags: ['api', 'users'],
        auth: 'jwt',
        validate: {
            params: updateUserParams,
            payload: updateUserPayload
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: updateUserResponse
            }
        }
    },
    handler: updateUser
};

export default updateUserRoute;
