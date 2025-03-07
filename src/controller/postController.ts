import { Request, RequestHandler, Response, NextFunction } from 'express';
import { CustomError } from '../errors/customError';
import { StatusCodes } from 'http-status-codes';
import db from '../db/connect';

export const createPost: RequestHandler = async (req, res, next) => {
    const { title, body, userId } = req.body;

    try {
        const post = await db.post.create({
            data: {
                title,
                body,
                userId: parseInt(userId),
            },
        });

        res.status(StatusCodes.CREATED).json(post);
    } catch (error) {
        next(error);
    }
};


export const getPostsByUserId: RequestHandler = async (req, res, next) => {
    const userId = +(req.query.userId as string);

    try {
        const posts = await db.post.findMany({
            where: { userId },
        });

        res.status(StatusCodes.OK).json(posts);
    } catch (error) {
        next(error);
    }
};


export const deletePost: RequestHandler = async (req, res, next) => {
    const id = +(req.params.id);

    try {
        const post = await db.post.findUnique({
            where: { id },
        });

        if (!post) {
            throw new CustomError(`Post with id:${id} not found`, StatusCodes.NOT_FOUND);
        }

        await db.post.delete({
            where: { id },
        });

        res.status(StatusCodes.OK).json({
            message: `Post with id:${id} deleted successfully`,
        });
    } catch (error) {
        next(error);
    }
};