import { login } from '../controllers/authController.js';
import Joi from 'joi';

const loginSchema = Joi.object({
  workEmail: Joi.string().email().required(),
  password: Joi.string().required()
});

const authRoutes = [
  {
    method: 'POST',
    path: '/login',
    options: {
      description: 'User login',
      notes: 'Returns JWT on successful login',
      tags: ['api', 'auth'],
      validate: { payload: loginSchema }
    },
    handler: login,
  },
];
export default authRoutes;