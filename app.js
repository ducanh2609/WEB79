import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserModel from './models/users/UserModel.js'
dotenv.config()


const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', () => {
    res.send('Homepage')
})


app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body
        const findUser = await UserModel.findOne({ username })
        console.log('findUser', findUser)
        if (findUser) {
            throw new Error('Username is exist')
        }
        console.log('test')
        const createdUser = await UserModel.create({
            username, password
        })
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
})

app.get('/users', async (req, res) => {
    try {
        const allUser = await UserModel.find()
        res.status(200).send({
            users: allUser,
            total: allUser.length,
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }

})

app.get('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const findUser = await UserModel.findById(userId)
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
})

app.put('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { password } = req.body;
        const currentUser = await UserModel.findById(userId)
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
})


mongoose.connect(`mongodb+srv://${process.env.BD_USERNAME}:${process.env.BD_PASSWORD}@testdatabase.eg0demb.mongodb.net/`)


app.listen(PORT, (err) => {
    if (err) throw new Error
    console.log(`Server run in http://localhost:${PORT}`);
})