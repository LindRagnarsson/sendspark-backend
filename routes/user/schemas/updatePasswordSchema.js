import Joi from 'joi';

const updatePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8)
        .pattern(/[A-Z]/)
        .pattern(/[a-z]/)
        .pattern(/\d/)
        .required()
});

export default updatePasswordSchema;
