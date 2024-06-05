import { getOneUserDB } from "../models/users.models.js"
import jwt from 'jsonwebtoken'

export const Authorization = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        // if (!token) {
        //     throw new Error('Unauthorization')
        // }
        const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await getOneUserDB(userInfo._id)
        // if (!findUser) {
        //     throw new Error('User not found')
        // }
        const checkRole = user.role.includes('admin')
        if (!checkRole) {
            throw new Error('Forbideen')
        }
        req.userId = userInfo._id
        next()
    } catch (error) {
        res.status(403).send({
            error: error.message
        })
    }
}

export const Authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if (!token) {
            throw new Error('Unauthorization')
        }
        const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await getOneUserDB(userInfo._id)
        if (!user) {
            throw new Error('User is not login')
        }
        next()
    } catch (error) {
        res.status(401).send({
            error: error.message
        })
    }
}