const Joi = require('joi');
const userSchema = Joi.object({
  firstName: Joi.string().max(120).required(),
  lastName: Joi.string().max(120).required(),
  companyName: Joi.string().max(120).required(),
  jobTitle: Joi.string().max(120).optional(),
  workEmail: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/\d/)
    .required()
});
module.exports = { userSchema };