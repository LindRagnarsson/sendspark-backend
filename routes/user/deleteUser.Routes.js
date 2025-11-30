import deleteUserController from '../../controllers/user/deleteUser.Controller.js';
import { deleteUserParams, deleteUserResponse } from './schemas/deleteUser.Schema.js';

const deleteUserRoute = {
    method: 'DELETE',
    path: '/users/{id}',
    options: {
        description: 'Delete user by id',
        tags: ['api', 'users'],
        auth: 'jwt',
        validate: {
            params: deleteUserParams
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: deleteUserResponse
            }
        }
    },
    handler: deleteUserController.handle
};

export default deleteUserRoute;
