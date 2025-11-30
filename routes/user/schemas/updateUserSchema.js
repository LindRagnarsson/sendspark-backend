import Joi from 'joi';

const updateUserSchema = Joi.object({
    firstName: Joi.string().max(120).optional(),
    lastName: Joi.string().max(120).optional(),
    companyName: Joi.string().max(120).optional(),
    jobTitle: Joi.string().max(120).optional()
}).label('UpdateUserSchema');

export default updateUserSchema;
