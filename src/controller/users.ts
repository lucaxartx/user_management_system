import { RequestHandler } from 'express'
import db from "../db/connect"
import { CustomError } from '../errors/customError'
import { StatusCodes } from 'http-status-codes'
import { stat } from 'fs'

export const getUsers: RequestHandler =
    async (req, res, next) => {
        const page = +(req.query.page as string) || 1
        const pgSize = +(req.query.pgSize as string) || 10

        try {
            const users = await db.user.findMany({
                skip: (page - 1) * pgSize,
                take: pgSize,
                include: {
                    address: true,
                    posts: true
                }
            });

            res.status(StatusCodes.OK).json(users);
        } catch (error) {
            next(error)
        }
    }

export const userCount: RequestHandler = async (req, res, next) => {
    try {
        const count = await db.user.count()
        res.status(StatusCodes.OK).json({ count })
    } catch (error) {
        next(error)
    }
}

export const getUserById: RequestHandler<{ id: String }> = async (req, res, next) => {
    const id = +(req.params.id)
    if (!id) {
        return next(new CustomError('Please provide user id', StatusCodes.BAD_REQUEST));
    }
    const user = await db.user.findFirst(
        {
            where: { id },
            include: {
                address: true
            }
        }
    )
    if (!user) {
        throw new CustomError('User not found', StatusCodes.NOT_FOUND); // Custom error for user not found
    }
    res.status(StatusCodes.OK).json({ user })

}


export const createUser: RequestHandler = async (req, res, next): Promise<void> => {
    const id = +(req.params.id)
    const { name, email } = req.body

    if (!name || !email) {
        return next(new CustomError('Please provide name and email', StatusCodes.BAD_REQUEST));
    }

    try {
        const existingUser = await db.user.findUnique({
            where: { id },
        });

        if (existingUser) {
            return next(new CustomError('User with this email already exists', StatusCodes.CONFLICT));
        }

        const newUser = await db.user.create({
            data: {
                id,
                name,
                email,
            },
        });
        res.status(StatusCodes.CREATED).json(newUser);
    } catch (error) {
        next(error)
    }
};



