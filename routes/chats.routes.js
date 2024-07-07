import { Router } from "express";
import { getChat } from "../controllers/chats.controllers.js";

const chatRouter = Router()

chatRouter.get('/', getChat)


export default chatRouter