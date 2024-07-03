import { createTodoDB, deleteTodoDB, findTodoById, getTodoDB } from "../models/todos.models.js"

export const getTodoList = async (req, res) => {
    try {
        const result = await getTodoDB()
        console.log(res)
        res.status(200).send({
            data: result,
            total: result.length,
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

export const createTodo = async (req, res) => {
    const { title, checked } = req.body
    try {
        const createdTodo = await createTodoDB({ title, checked })
        res.status(200).send({
            status: 'success',
            todo: createdTodo,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const updateTodo = async (req, res) => {
    const { todoId } = req.params
    const { title, checked } = req.body
    try {
        const curentTodo = await findTodoById(todoId)
        console.log('curentTodo', curentTodo);
        if (!curentTodo) throw new Error('Todo is not found');
        curentTodo.title = title
        curentTodo.checked = checked
        await curentTodo.save();

        res.status(201).send({
            data: curentTodo,
            message: 'Updated info!',
            success: true
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const deleteTodo = async (req, res) => {
    const { todoId } = req.params
    try {
        await deleteTodoDB(todoId)
        res.status(200).send({
            status: 'delete success'
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}