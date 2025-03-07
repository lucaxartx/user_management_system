import Joi from 'joi';


export const createAddressSchema = Joi.object({
    street: Joi.string().required().messages({
        'any.required': 'Street is required',
        'string.empty': 'Street cannot be empty',
    }),
    city: Joi.string().required().messages({
        'any.required': 'City is required',
        'string.empty': 'City cannot be empty',
    }),
});


export const updateAddressSchema = Joi.object({
    userId: Joi.string().optional(),
    street: Joi.string().optional(),
    city: Joi.string().optional(),
}).or('street', 'city').messages({
    'object.missing': 'At least one field (street or city) must be provided',
});