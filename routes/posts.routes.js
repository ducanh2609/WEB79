import { Router } from "express";
import { createPost, updatePost } from "../controllers/posts.controllers.js";


const postRouter = Router()

postRouter.post('/', createPost)
postRouter.put('/:postId', updatePost)


export default postRouter