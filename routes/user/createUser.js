import { createUser } from '../../controllers/user/createUser.js';
import { userSchema } from '../../middlewares/validators.js';

const createUserRoute = {
    method: 'POST',
    path: '/users',
    options: {
        description: 'Register a new user',
        notes: 'Creates a user and returns their data without password.',
        tags: ['api', 'users'],
        validate: { payload: userSchema },
        plugins: {
            'hapi-swagger': {
                payloadType: 'json',
                responses: {
                    201: {
                        description: 'User created',
                        schema: userSchema,
                    },
                    400: {
                        description: 'Validation or duplicate email error'
                    }
                },
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
    handler: createUser,
};

export default createUserRoute;
