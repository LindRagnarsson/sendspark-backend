import Joi from 'joi';

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
    404: {
        description: 'User not found'
    },
    500: {
        description: 'Server error'
    }
};
