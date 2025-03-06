import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Create an address for a user
 */
export const createAddress = async (req: Request, res: Response) => {
    // const userId = req.params.userId;
    const { street, city, userId } = req.body;

    const findUser = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
    })
    if (!findUser) {
        res.status(400).json({ error: 'User not found' });
    }

    try {
        const address = await prisma.address.create({
            data: {
                street,
                city,
                userId: parseInt(userId),
            },
        });
        console.log(address);

        res.status(201).json(address);
    } catch (error) {
        console.error('Error creating address:', error);
        res.status(500).json({ error: 'An error occurred while creating the address.' });
    }
};

/**
 * Update an address for a user
 */
export const updateAddress = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { street, city } = req.body;

    try {
        const address = await prisma.address.update({
            where: { userId: parseInt(userId) },
            data: { street, city },
        });

        res.status(200).json(address);
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ error: 'An error occurred while updating the address.' });
    }
};