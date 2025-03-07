import Joi from 'joi';


export const userSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'any.required': '"id" is required',
        'number.base': '"id" must be a number',
        'number.integer': '"id" must be an integer',
        'number.positive': '"id" must be a positive number',
    }),
    name: Joi.string().required().messages({
        'any.required': '"name" is required',
        'string.empty': '"name" cannot be empty',
    }),
    email: Joi.string().email().required().messages({
        'any.required': '"email" is required',
        'string.email': '"email" must be a valid email',
        'string.empty': '"email" cannot be empty',
    }),
});