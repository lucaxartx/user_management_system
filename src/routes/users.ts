import express from "express";
import { createUser, getUserById, getUsers, userCount } from "../controller/users"
import { validateRequest } from '../middleware/validateRequest.ts';
import { userSchema } from '../validators/userValidation';
import Joi from "joi";

const router = express.Router()

router.get('/user/:id', getUserById)
router.get('/users/count', userCount)
router.get('/users', getUsers)
router.post('/users/:id', validateRequest(userSchema), createUser)

export default router