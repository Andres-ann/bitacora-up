import Joi from 'joi';

export const loginValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).alphanum().required().messages({
    'string.empty': 'Username is required',
    'string.min': 'Username must have at least 3 characters',
    'string.max': 'Username cannot exceed 30 characters',
    'string.alphanum': 'Username must only contain letters and numbers',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must have at least 6 characters',
  }),
});
