import Joi from 'joi';
import { badRequestSchema, serverErrorSchema } from '../../shared/schemas/httpCodes.Schema.js';

export const createUserPayload = Joi.object({
  firstName: Joi.string().max(120).required(),
  lastName: Joi.string().max(120).required(),
  companyName: Joi.string().max(120).required(),
  jobTitle: Joi.string().max(120).optional(),
  workEmail: Joi.string().email().required(),
  password: Joi.string().min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/\d/)
    .required()
});

export const createUserResponse = {
  201: {
    description: 'User created',
    schema: createUserPayload,
  },
  400: badRequestSchema,
  500: serverErrorSchema
};
