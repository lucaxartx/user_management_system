import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Create a post for a user
 */
export const createPost = async (req: Request, res: Response) => {
    const { title, body, userId } = req.body;

    try {
        const post = await prisma.post.create({
            data: {
                title,
                body,
                userId: parseInt(userId),
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'An error occurred while creating the post.' });
    }
};

/**
 * Get all posts for a user
 */
export const getPostsByUserId = async (req: Request, res: Response) => {
    const userId = +(req.query.userId as string);

    // console.log('userId:::::::', userId, "::::::");
    try {
        const posts = await prisma.post.findMany({
            where: { userId },
        });


        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
};