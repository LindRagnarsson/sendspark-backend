import Joi from 'joi';

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
    401: {
        description: 'Invalid email or password'
    },
    500: {
        description: 'Server error'
    }
};
