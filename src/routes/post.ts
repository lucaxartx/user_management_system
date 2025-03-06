import express, { RequestHandler } from 'express';
import { createPost, getPostsByUserId } from '../controller/postController';
import { createPostSchema } from '../validators/postValidator';
import { validateRequest } from '../middleware/validateRequest.ts';
import Joi from 'joi';
const router = express.Router();

// POST /posts
router.post(
    '/post',
    validateRequest(createPostSchema), // Validate the request body
    createPost
);

// GET /posts?userId={userId}
router.get(
    '/post',
    (req, res, next) => {
        // Validate the userId query parameter
        const { error } = Joi.object({
            userId: Joi.number().integer().positive().required(),
        }).validate({ userId: req.query.userId });

        if (error) {
            const errors = error.details.map((detail) => ({
                message: detail.message,
                field: detail.context?.key,
            }));
            res.status(400).json({ errors });
        }
        next();
    },
    getPostsByUserId
);

export default router;