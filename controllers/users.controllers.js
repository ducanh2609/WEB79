import { createUser, findOneUser, getAllUserDB, getOneUserDB } from "../models/users.models.js"

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
        const { username, password } = req.body
        const findUser = await findOneUser({ username })
        if (findUser) {
            throw new Error('Username is exist')
        }
        const createdUser = await createUser({ username, password })
        if (createdUser) {
            res.status(200).send({
                message: 'Created',
                data: createdUser,
            })
        }
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}