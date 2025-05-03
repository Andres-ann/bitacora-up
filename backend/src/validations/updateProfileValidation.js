import Joi from 'joi';

export const updateProfileValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 50 characters long',
  }),

  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional()
    .messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username cannot be empty',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must be at most 30 characters long',
      'string.pattern.base':
        'Username must only contain alphanumeric characters and underscores',
    }),

  avatar: Joi.string().uri().optional().messages({
    'string.base': 'Avatar must be a string',
    'string.uri': 'Avatar must be a valid URL',
  }),
});
