import Joi from 'joi';
import { notFoundSchema, serverErrorSchema } from '../../shared/schemas/httpCodes.Schema.js';

export const updateUserParams = Joi.object({
    id: Joi.string().required().description('the user id')
});

export const updateUserPayload = Joi.object({
    firstName: Joi.string().max(120).optional(),
    lastName: Joi.string().max(120).optional(),
    companyName: Joi.string().max(120).optional(),
    jobTitle: Joi.string().max(120).optional()
});

export const updateUserResponse = {
    200: {
        description: 'User updated',
        schema: Joi.object({
            user: Joi.object().label('User')
        })
    },
    404: notFoundSchema,
    500: serverErrorSchema
};
