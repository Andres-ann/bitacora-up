import Joi from 'joi';

export const userValidationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must have at least 1 character',
    'string.max': 'Name cannot exceed 100 characters',
    'any.required': 'The name field is required',
  }),
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .regex(/^[a-zA-Z0-9_]+$/)
    .messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username cannot be empty',
      'string.min': 'Username must have at least 3 characters',
      'string.max': 'Username cannot exceed 30 characters',
      'string.pattern.base':
        'Username can only contain letters, numbers, and underscores',
      'any.required': 'The username field is required',
    }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must have at least 6 characters',
    'any.required': 'The password field is required',
  }),
  avatar: Joi.string().uri().optional().messages({
    'string.base': 'Avatar must be a string',
    'string.uri': 'Avatar must be a valid URL',
  }),
});
