import { updatePassword } from '../../controllers/user/updatePassword.Controller.js';
import { updatePasswordPayload, updatePasswordResponse } from './schemas/updatePassword.Schema.js';

const updatePasswordRoute = {
    method: 'PUT',
    path: '/users/update-password',
    options: {
        description: 'Update user password',
        notes: 'Requires JWT token. User can update their own password by providing current and new password. First, login to get a token, then use it in the Authorization header.',
        tags: ['api', 'users'],
        validate: { payload: updatePasswordPayload },
        auth: 'jwt',
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: updatePasswordResponse,
                examples: {
                    'application/json': {
                        currentPassword: 'MiContraseñaActual123',
                        newPassword: 'MiNuevaContraseña456'
                    }
                },
                //security: [{ jwt: [] }]
            }
        }
    },
    handler: updatePassword
};

export default updatePasswordRoute;
