import Joi from 'joi';

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
    400: {
        description: 'Invalid Payload'
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
};
