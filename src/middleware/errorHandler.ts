
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', err.message);


    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;


    res.status(statusCode).json({
        message: err.message || 'Something went wrong',
        // stack: process.env.NODE_ENV === 'production' ? undefined : err.stack, // Hide stack traces in production
    });
};