import express from "express";

const router = express.Router()


import { createUser, getUserById, getUsers, userCount } from "../controller/users"


router.post('/users/:id', createUser)
router.get('/user/:id', getUserById)
router.get('/users/count', userCount)
router.get('/users', getUsers)

export default router