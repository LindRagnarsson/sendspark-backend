import Joi from 'joi';

const loginSchema = Joi.object({
    workEmail: Joi.string().email().required(),
    password: Joi.string().required()
});

export default loginSchema;
