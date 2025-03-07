import { RequestHandler } from 'express';
import db from '../db/connect';
import { CustomError } from '../errors/customError';
import { StatusCodes } from 'http-status-codes';

export const createAddress: RequestHandler = async (req, res, next) => {
    // const userId = req.params.userId;
    const { street, city, userId } = req.body;

    const findUser = await db.user.findUnique({
        where: { id: parseInt(userId) },
    })
    if (!findUser) {
        throw new CustomError('User not found', StatusCodes.NOT_FOUND);

    }

    try {
        const address = await db.address.create({
            data: {
                street,
                city,
                userId: parseInt(userId),
            },
        });


        res.status(StatusCodes.CREATED).json(address);
    } catch (error) {
        next(error)
    }
};


export const updateAddress: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;
    const { street, city } = req.body;

    try {
        const address = await db.address.update({
            where: { userId: parseInt(userId) },
            data: { street, city },
        });

        res.status(200).json(address);
    } catch (error) {
        next(error)

    }
};


export const getAddress: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const address = await db.address.findUnique({
            where: { userId: parseInt(userId) },
        });
        res.status(StatusCodes.OK).json(address);
    } catch (error) {
        next(error)
    }
};