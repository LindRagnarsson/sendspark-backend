import Joi from 'joi';
import { badRequestSchema, unauthorizedSchema, notFoundSchema, serverErrorSchema } from '../../shared/schemas/httpCodes.Schema.js';

export const updatePasswordPayload = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8)
        .pattern(/[A-Z]/)
        .pattern(/[a-z]/)
        .pattern(/\d/)
        .required()
});

export const updatePasswordResponse = {
    200: {
        description: 'Password updated successfully',
        schema: Joi.object({
            message: Joi.string().example('Password updated successfully')
        })
    },
    400: badRequestSchema,
    401: unauthorizedSchema,
    404: notFoundSchema,
    500: serverErrorSchema
};
