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





// app.get('/users/:id', (req, res) => {
//     const { id } = req.params
//     const user = users.find((item) => item.id === id)
//     if (user) {
//         res.status(200).json(user)
//     } else {
//         res.status(404).json({
//             message: 'User not found'
//         })
//     }
// })

// console.log(Math.random().toString(36))

// app.post('/users', (req, res) => {
//     console.log(req.body)
//     const user = req.body
//     if (user.id) {
//         const email = user.email
//         const userIndex = users.findIndex((item) => item.email === email || item.id === user.id)
//         if (userIndex !== -1) {
//             res.json({
//                 message: 'User exist'
//             })
//         } else {
//             users.push(user)
//             res.status(200).json({
//                 message: 'Create user successfully'
//             })
//         }
//     } else {
//         res.status(501).json({
//             message: 'Params not is valid'
//         })
//     }
// })

// app.get('/users/:userId/post', (req, res) => {
//     const { userId } = req.params
//     const post = posts.filter((item) => item.userId === userId)
//     if (post?.length) {
//         res.status(200).json({
//             post,
//             total: post.length
//         })
//     } else {
//         res.status(404).json({
//             message: 'Post not found'
//         })
//     }
// })

// app.post('/users/:userId/post', (req, res) => {
//     const { userId } = req.params
//     const body = req.body || {}
//     const user = users.find((item) => item.id === userId)
//     if (user) {
//         const post = {
//             ...body,
//             userId,
//             postId: Math.floor(Math.random()) * 10000,
//             createdAt: new Date()
//         }
//         res.status(200).json({
//             message: 'Create post successfully'
//         })
//     } else {
//         res.status(404).json({
//             message: 'User not found'
//         })
//     }
// })

// app.put('/posts/:postId', (req, res) => {
//     const { postId } = req.params
//     const { userId } = req.query
//     const { content, isPublic } = req.body

//     const findPost = posts.find((item) => item.postId === postId)
//     const indexPost = posts.findIndex((item) => item.postId === postId)
//     if (findPost) {
//         const checkUser = findPost.userId === userId
//         if (checkUser) {
//             const updatePost = {
//                 ...findPost,
//                 content,
//                 isPublic,
//             }
//             posts[indexPost] = updatePost
//             res.status(200).json({
//                 message: 'Update successfully'
//             })
//         } else {
//             res.status(400).json({
//                 message: 'User is incorrect'
//             })
//         }
//     } else {
//         res.status(404).json({
//             message: 'post not found'
//         })
//     }
// })

// app.delete('/posts/:postId', (req, res) => {
//     const { postId } = req.params
//     const { userId } = req.query

//     const findPost = posts.find((item) => item.postId === postId)
//     console.log('findPost', findPost)
//     const indexPost = posts.findIndex((item) => item.postId === postId)
//     if (findPost) {
//         const checkUser = findPost.userId === userId
//         if (checkUser) {
//             delete posts[indexPost]
//             res.status(200).json({
//                 message: 'Delete successfully'
//             })
//         } else {
//             res.status(400).json({
//                 message: 'User is incorrect'
//             })
//         }
//     } else {
//         res.status(404).json({
//             message: 'post not found'
//         })
//     }
// })


// app.get('/posts', (req, res) => {
//     const { isPublic } = req.query
//     const listPost = posts.filter((item) => item.isPublic === !!isPublic)
//     res.status(200).send({
//         data: listPost,
//         total: listPost.length
//     })
// })

// app.post('/users', async (req, res) => {
//     const { userName } = req.body
//     console.log('userName', userName)
//     try {
//         const data = await getData('users')
//         const checkUser = data.find((item) => item.userName === userName)
//         if (checkUser) {
//             throw new Error('User exist')
//         }
//         data.push({
//             id: `US${Date.parse(new Date) / 1000}`,
//             userName,
//         })
//         res.status(200).send({
//             message: 'Successfully',
//             status: 200,
//         })
//     } catch (error) {
//         console.log(err)
//         res.status(405).send({
//             message: err.message,
//             status: 405,
//         })
//     }
// fetch('http://localhost:3000/users').then((rs) => {
//     return rs.json()
// }).then((data) => {
//     const checkUser = data.find((item) => item.userName === userName)
//     if (checkUser) {
//         throw new Error('User exist')
//     }
//     data.push({
//         id: `US${Date.parse(new Date) / 1000}`,
//         userName,
//     })

//     res.status(200).send({
//         message: 'Successfully',
//         status: 200,
//     })
// }).catch(err => {
//     console.log(err)
//     res.status(405).send({
//         message: err.message,
//         status: 405,
//     })
// })
// })

// app.post('/posts', async (req, res) => {
//     const { authorId } = req.query
//     const { content } = req.body
//     try {
//         const data = await getData('posts')
//         const newData = {
//             id: `PS${getId()}`,
//             content,
//             authorId,
//         }
//         data.push(newData)
//         res.status(200).send({
//             message: 'Successfully',
//             data: newData,
//         })
//     } catch (error) {
//         res.status(500).send({
//             message: 'Internet server error',
//             status: 500,
//         })
//     }
// })

// app.put('/posts/:postId', async (req, res) => {
//     const { postId } = req.params
//     const { authorId } = req.query
//     const { content } = req.body
//     try {
//         const data = await getData('posts')
//         const findPost = data.find((item) => item.id === postId)
//         const indexPost = data.findIndex((item) => item.postId === postId)
//         if (findPost) {
//             const checkUser = findPost.authorId === authorId
//             if (checkUser) {
//                 const updatePost = {
//                     ...findPost,
//                     content,
//                 }
//                 data[indexPost] = updatePost
//                 res.status(200).json({
//                     message: 'Update successfully'
//                 })
//             } else {
//                 throw new Error('User is incorrect')
//             }
//         } else {
//             throw new Error('post not found')
//         }
//     } catch (error) {
//         res.status(405).send({
//             message: error.message,
//             status: 405,
//         })
//     }
// })

// app.post('/comments/:postId', async (req, res) => {
//     const { postId } = req.params
//     const { authorId } = req.query
//     const { content } = req.body
//     try {
//         const data = await getData('posts')
//         const checkPost = data.find((item) => item.postId = postId)
//         if (!checkPost) {
//             throw new Error('post not found')
//         }
//         if (checkPost.authorId === authorId) {
//             throw new Error('user can not comment to this post')
//         }
//         const newData = {
//             id: `CMT${getId()}`,
//             postId,
//             content,
//             authorId
//         }
//         data.push(newData)
//         res.status(200).send({
//             message: 'cmt successfully',
//             status: 200,
//         })
//     } catch (error) {
//         res.status(405).send({
//             message: error.message,
//             status: 405,
//         })
//     }
// })

// phương thức connect với tham số connect string

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