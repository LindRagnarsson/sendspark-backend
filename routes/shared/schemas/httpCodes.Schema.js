import Joi from 'joi';

export const basicErrorSchema = Joi.object({
    error: Joi.string().required()
}).label('Error');

export const badRequestSchema = {
    description: 'Bad Request',
    schema: basicErrorSchema
};

export const unauthorizedSchema = {
    description: 'Unauthorized',
    schema: basicErrorSchema
};

export const notFoundSchema = {
    description: 'Not Found',
    schema: basicErrorSchema
};

export const serverErrorSchema = {
    description: 'Server Error',
    schema: basicErrorSchema
};
