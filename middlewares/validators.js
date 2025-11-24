import Joi from 'joi';
export const userSchema = Joi.object({
  firstName: Joi.string().max(120).required(),
  lastName: Joi.string().max(120).required(),
  companyName: Joi.string().max(120).required(),
  jobTitle: Joi.string().max(120).optional(),
  workEmail: Joi.string().email().required(),
  password: Joi.string().min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/\d/)
    .required()
});

export const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/\d/)
    .required()
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().max(120).optional(),
  lastName: Joi.string().max(120).optional(),
  companyName: Joi.string().max(120).optional(),
  jobTitle: Joi.string().max(120).optional()
});