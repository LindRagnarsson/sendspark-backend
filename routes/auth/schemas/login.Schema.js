import Joi from 'joi';
import { unauthorizedSchema, serverErrorSchema } from '../../shared/schemas/httpCodes.Schema.js';

export const loginPayload = Joi.object({
    workEmail: Joi.string().email().required(),
    password: Joi.string().required()
});

export const loginResponse = {
    200: {
        description: 'Login successful - Returns JWT token',
        schema: Joi.object({
            token: Joi.string().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
        })
    },
    401: unauthorizedSchema,
    500: serverErrorSchema
};
