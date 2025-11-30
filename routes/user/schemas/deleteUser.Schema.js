import Joi from 'joi';
import { notFoundSchema, serverErrorSchema } from '../../shared/schemas/httpCodes.Schema.js';

export const deleteUserParams = Joi.object({
    id: Joi.string().required().description('the user id')
});

export const deleteUserResponse = {
    200: {
        description: 'User deleted',
        schema: Joi.object({
            message: Joi.string().example('User deleted')
        })
    },
    404: notFoundSchema,
    500: serverErrorSchema
};
