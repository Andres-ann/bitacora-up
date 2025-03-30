import Joi from 'joi';

export const fraseValidationSchema = Joi.object({
  frase: Joi.string().min(3).max(500).trim().required().messages({
    'string.base': 'The phrase must be a string',
    'string.empty': 'The phrase cannot be empty',
    'string.min': 'The phrase must have at least 3 characters',
    'string.max': 'The phrase cannot exceed 500 characters',
    'any.required': 'The phrase field is required',
  }),
  autor: Joi.string().min(3).max(100).trim().required().messages({
    'string.base': 'Author must be a string',
    'string.empty': 'Author cannot be empty',
    'string.min': 'Author name must have at least 3 characters',
    'string.max': 'Author name cannot exceed 100 characters',
    'any.required': 'The author field is required',
  }),
  gif: Joi.string().allow(null, ''),
  likes: Joi.number().integer().min(0).default(0),
  visualizaciones: Joi.number().integer().min(0).default(0),
  usuarioId: Joi.string().required().messages({
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required',
  }),
  comentarios: Joi.array().items(
    Joi.object({
      comentario: Joi.string().allow(null, '').trim(),
      usuarioId: Joi.string().required().messages({
        'string.empty': 'User ID is required for comments',
        'any.required': 'User ID is required for comments',
      }),
      gif: Joi.string().allow(null, ''),
    })
  ),
});
