import { createPostDB, findPostById } from "../models/posts.models.js"
import { getOneUserDB } from "../models/users.models.js"

export const createPost = async (req, res) => {
    const { content, userId } = req.body
    try {
        const findUser = await getOneUserDB(userId)
        if (!findUser) {
            throw new Error('User is not correct!')
        }
        const createdPost = await createPostDB({ userId, content })
        if (createdPost) {
            res.status(200).send({
                message: 'Created',
                data: createdPost,
            })
        }
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

export const updatePost = async (req, res) => {
    const { postId } = req.params
    const { userId } = req.query
    const { content } = req.body
    try {
        const currentPost = await findPostById(postId)
        if (!currentPost) {
            throw new Error('Post not found')
        }
        if (currentPost.userId !== userId) {
            throw new Error('User can not edit this post')
        }
        currentPost.content = content
        await currentPost.save();
        res.status(201).send({
            data: currentPost,
            message: 'Updated',
            success: true
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

export const getAdminPage = async (req, res) => {
    try {
        const { userId } = req.query
        const findUser = await getOneUserDB(userId)

        res.status(200).send({
            data: findUser
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }

}