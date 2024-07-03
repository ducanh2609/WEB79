import { Router } from "express";
import { createTodo, deleteTodo, getTodoList, updateTodo } from "../controllers/todos.controllers.js";
const todoRouter = Router()


todoRouter.get('/', getTodoList)
todoRouter.post('/', createTodo)
todoRouter.put('/:todoId', updateTodo)
todoRouter.delete('/:todoId', deleteTodo)

export default todoRouter
