import { createUser, findOneUser, getAllUserDB, getOneUserDB } from "../models/users.models.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const getAllUser = async (req, res) => {
    try {
        const allUser = await getAllUserDB()
        res.status(200).send({
            users: allUser,
            total: allUser.length,
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }

}

export const getOneUser = async (req, res) => {
    try {
        const { userId } = req.params
        const findUser = await getOneUserDB(userId)
        if (!findUser) {
            throw new Error('User not found')
        }
        res.status(200).send({
            user: findUser,
            status: 'Success'
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { password } = req.body;
        const currentUser = await getOneUserDB(userId)
        if (!currentUser) throw new Error('User is not exists!');
        currentUser.password = password;
        await currentUser.save();

        res.status(201).send({
            data: currentUser,
            message: 'Updated info!',
            success: true
        });
    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        });
    }
}

export const register = async (req, res) => {
    try {
        const { username, password, role } = req.body
        const findUser = await findOneUser({ username })
        if (findUser) {
            throw new Error('Username is exist')
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const createdUser = await createUser({ username, password: hashPassword, role: role || [] })
        if (createdUser) {
            res.status(200).send({
                message: 'Created',
            })
        }
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await findOneUser({ username })
        if (!user) {
            throw new Error('User not found')
        }
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (!isMatchPassword) {
            throw new Error('User or password is not incorrect')
        }
        const { _id } = user
        const token = jwt.sign({ _id, username }, process.env.JWT_SECRET_KEY)
        res.status(200).send({
            token,
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }
}