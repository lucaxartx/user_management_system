import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';


export const validateRequest = (schema: Joi.Schema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate({ ...req.body, ...req.params }, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => ({
                message: detail.message,
                field: detail.context?.key,
            }));
            console.log(errors);

            res.status(400).json({ errors });
        }

        next();
    };
};