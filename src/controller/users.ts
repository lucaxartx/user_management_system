import { RequestHandler } from 'express'
import db from "../db/connect"



export const getUsers: RequestHandler =
    async (req, res) => {
        const page = +(req.query.page as string) || 1
        const pgSize = +(req.query.pgSize as string) || 10

        try {
            const users = await db.user.findMany({
                skip: (page - 1) * pgSize,
                take: pgSize,
            });

            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'error fetching users' });
        }
    }

export const userCount: RequestHandler = async (req, res) => {
    try {
        const count = await db.user.count()
        res.status(200).json({ count })
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: ' error fetching user count' });
    }
}

export const getUserById: RequestHandler<{ id: String }> = async (req, res) => {
    const id = +(req.params.id)
    if (!id) {
        res.status(400).json({ error: 'please provide user id' })
    }
    const user = await db.user.findFirst(
        {
            where: { id },
            include: {
                address: true
            }
        }
    )
    res.status(200).json({ user })

}


export const createUser: RequestHandler = async (req, res) => {
    const id = +(req.params)
    const { name, email } = req.body

    if (!name || !email) {
        res.status(400).json({ error: 'please provide name and email' })
    }

    try {
        const existingUser = await db.user.findUnique({
            where: { id },
        });

        if (existingUser) {
            res.status(400).json({ error: 'user with this ID already exists' });
        }


        const newUser = await db.user.create({
            data: {
                id,
                name,
                email,
            },
        });


        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ error: 'error occurred while creating  user' });
    }
};