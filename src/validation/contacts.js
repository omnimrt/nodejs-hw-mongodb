import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must cannot be a number',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 20 characters long',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number must be at most 20 characters long',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.min': 'Email must be at least 3 characters long',
    'string.max': 'Email must be at most 20 characters long',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 20 characters long',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number must be at most 20 characters long',
  }),
  email: Joi.string().min(3).max(30).messages({
    'string.min': 'Email must be at least 3 characters long',
    'string.max': 'Email must be at most 20 characters long',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
});
