import { login } from '../../controllers/auth/login.js';
import Joi from 'joi';

const loginSchema = Joi.object({
    workEmail: Joi.string().email().required(),
    password: Joi.string().required()
});

const loginRoute = {
    method: 'POST',
    path: '/login',
    options: {
        description: 'User login - Get JWT token',
        notes: 'Authenticate user and receive JWT token. Use this token in Authorization header for protected endpoints like /users/update-password',
        tags: ['api', 'auth'],
        validate: { payload: loginSchema },
        auth: false,
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: {
                    200: {
                        description: 'Login successful - Returns JWT token',
                        schema: Joi.object({
                            token: Joi.string().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
                        })
                    },
                    401: {
                        description: 'Invalid email or password'
                    }
                },
                examples: {
                    'application/json': {
                        workEmail: 'usuario@ejemplo.com',
                        password: 'MiContraseña123'
                    }
                }
            }
        }
    },
    handler: login,
};

export default loginRoute;
