import createUserController from '../../controllers/user/createUser.Controller.js';
import { createUserPayload, createUserResponse } from './schemas/createUser.Schema.js';

const createUserRoute = {
    method: 'POST',
    path: '/users',
    options: {
        description: 'Register a new user',
        notes: 'Creates a user and returns their data without password.',
        tags: ['api', 'users'],
        validate: { payload: createUserPayload },
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: createUserResponse,
                examples: {
                    'application/json': {
                        firstName: 'Nuno',
                        lastName: 'Leyva',
                        companyName: 'Acme Inc',
                        workEmail: 'juan@acme.com',
                        password: 'Abc12345',
                        jobTitle: 'Developer'
                    }
                }
            }
        }
    },
    handler: createUserController.handle,
};

export default createUserRoute;
