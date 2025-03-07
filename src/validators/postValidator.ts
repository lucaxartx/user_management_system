import Joi from 'joi';


export const createPostSchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required': 'Title is required',
        'string.empty': 'Title cannot be empty',
    }),
    body: Joi.string().required().messages({
        'any.required': 'Body is required',
        'string.empty': 'Body cannot be empty',
    }),
    userId: Joi.number().integer().positive().required().messages({
        'any.required': 'User ID is required',
        'number.base': 'User ID must be a number',
        'number.integer': 'User ID must be an integer',
        'number.positive': 'User ID must be a positive number',
    }),
});