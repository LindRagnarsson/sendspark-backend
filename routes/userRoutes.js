import { createUser, listUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { updatePassword } from '../controllers/authController.js';
import { userSchema, updatePasswordSchema } from '../middlewares/validators.js';
import Joi from 'joi';

const userRoutes = [
  {
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
  },
  {
    method: 'GET',
    path: '/users',
    options: {
      description: 'Get all users (paginated)',
      notes: 'Requires JWT. Use ?page=1&limit=50',
      tags: ['api', 'users'],
      auth: 'jwt'
    },
    handler: listUsers,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    options: {
      description: 'Update user by id',
      tags: ['api', 'users'],
      auth: 'jwt'
    },
    handler: updateUser
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    options: {
      description: 'Delete user by id',
      tags: ['api', 'users'],
      auth: 'jwt'
    },
    handler: deleteUser
  },
  {
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
          security: [{ jwt: [] }]
        }
      }
    },
    handler: updatePassword
  }
];

export default userRoutes;