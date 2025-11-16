import { createUser } from '../controllers/userController.js';
import { userSchema } from '../middlewares/validators.js';

const userRoutes = [
  {
    method: 'POST',
    path: '/users',
    options: {
      description: 'Register a new user',
      notes: 'Creates a user and returns their data without password.',
      tags: ['api', 'users'], // <--- "api" tag for swagger
      validate: { payload: userSchema },
      plugins: {
        'hapi-swagger': {
          payloadType: 'json',
          responses: {
            201: {
              description: 'User created',
              schema: userSchema, // Reference to the user schema
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
      // ...
    },
    handler: createUser,
  }
];
export default userRoutes;