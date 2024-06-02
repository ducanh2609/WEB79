import { Router } from "express";
import { getAllUser, getOneUser, updateUser } from "../controllers/users.controllers.js";


const userRouter = Router()

userRouter.get('/', getAllUser)

userRouter.get('/:userId', getOneUser)

userRouter.put('/:userId', updateUser)

export default userRouter