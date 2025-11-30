import Joi from 'joi';

export const listUsersQuery = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(50)
});

export const listUsersResponse = {
    200: {
        description: 'List of users',
        schema: Joi.object({
            users: Joi.array().items(Joi.object()).label('Users'),
            pagination: Joi.object({
                total: Joi.number(),
                page: Joi.number(),
                pages: Joi.number()
            }).label('Pagination')
        })
    },
    500: {
        description: 'Server error'
    }
};
