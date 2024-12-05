import Joi from 'joi';

export const resetPasswordValidationSchema = Joi.object({
  resetToken: Joi.string().required().messages({
    'string.empty': 'Reset token is required',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.empty': 'New password is required',
    'string.min': 'New password must have at least 6 characters',
  }),
});
