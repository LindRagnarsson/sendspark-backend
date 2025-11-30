import loginController from '../../controllers/auth/login.Controller.js';
import { loginPayload, loginResponse } from './schemas/login.Schema.js';

const loginRoute = {
    method: 'POST',
    path: '/login',
    options: {
        description: 'User login - Get JWT token',
        notes: 'Authenticate user and receive JWT token. Use this token in Authorization header for protected endpoints like /users/update-password',
        tags: ['api', 'auth'],
        validate: { payload: loginPayload },
        auth: false,
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: loginResponse,
                examples: {
                    'application/json': {
                        workEmail: 'usuario@ejemplo.com',
                        password: 'MiContraseña123'
                    }
                }
            }
        }
    },
    handler: loginController.handle,
};

export default loginRoute;
