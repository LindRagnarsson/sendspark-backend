import { updatePassword } from '../../controllers/user/updatePassword.js';
import updatePasswordSchema from './schemas/updatePasswordSchema.js';
import Joi from 'joi';

const updatePasswordRoute = {
    method: 'PUT',
    path: '/users/update-password',
    options: {
        description: 'Update user password',
        notes: 'Requires JWT token. User can update their own password by providing current and new password. First, login to get a token, then use it in the Authorization header.',
        tags: ['api', 'users'],
        validate: { payload: updatePasswordSchema },
        auth: 'jwt',
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: {
                    200: {
                        description: 'Password updated successfully',
                        schema: Joi.object({
                            message: Joi.string().example('Password updated successfully')
                        })
                    },
                    400: {
                        description: 'Invalid Payload'
                    },
                    401: {
                        description: 'Invalid current password or unauthorized'
                    },
                    404: {
                        description: 'User not found'
                    },
                    500: {
                        description: 'Server error'
                    }
                },
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
