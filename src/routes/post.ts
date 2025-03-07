import express, { RequestHandler } from 'express';
import { createPost, getPostsByUserId, deletePost } from '../controller/postController';
import { createPostSchema } from '../validators/postValidator';
import { validateRequest } from '../middleware/validateRequest.ts';
import Joi from 'joi';
const router = express.Router();

router.post(
    '/post',
    validateRequest(createPostSchema),
    createPost
);


router.get(
    '/post',
    (req, res, next) => {

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
router.delete('/posts/:id', deletePost)

export default router;