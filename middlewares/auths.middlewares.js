import { getOneUserDB } from "../models/users.models.js"

export const checkRoleUser = async (req, res, next) => {
    try {
        const { userId } = req.query
        console.log('userId', userId)
        const findUser = await getOneUserDB(userId)
        if (!findUser) {
            throw new Error('User not found')
        }
        const checkRole = findUser.role.includes('admin')
        if (!checkRole) {
            throw new Error('K có quyền')
        }
        next()
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}