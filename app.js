import express from 'express'
import { users, posts } from './data/data.js'


const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', () => {
    res.send('Homepage')
})

app.get('/users/:id', (req, res) => {
    const { id } = req.params
    const user = users.find((item) => item.id === id)
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
})

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

app.put('/posts/:postId', (req, res) => {
    const { postId } = req.params
    const { userId } = req.query
    const { content, isPublic } = req.body

    const findPost = posts.find((item) => item.postId === postId)
    const indexPost = posts.findIndex((item) => item.postId === postId)
    if (findPost) {
        const checkUser = findPost.userId === userId
        if (checkUser) {
            const updatePost = {
                ...findPost,
                content,
                isPublic,
            }
            posts[indexPost] = updatePost
            res.status(200).json({
                message: 'Update successfully'
            })
        } else {
            res.status(400).json({
                message: 'User is incorrect'
            })
        }
    } else {
        res.status(404).json({
            message: 'post not found'
        })
    }
})

app.delete('/posts/:postId', (req, res) => {
    const { postId } = req.params
    const { userId } = req.query

    const findPost = posts.find((item) => item.postId === postId)
    console.log('findPost', findPost)
    const indexPost = posts.findIndex((item) => item.postId === postId)
    if (findPost) {
        const checkUser = findPost.userId === userId
        if (checkUser) {
            delete posts[indexPost]
            res.status(200).json({
                message: 'Delete successfully'
            })
        } else {
            res.status(400).json({
                message: 'User is incorrect'
            })
        }
    } else {
        res.status(404).json({
            message: 'post not found'
        })
    }
})


app.get('/posts', (req, res) => {
    const { isPublic } = req.query
    const listPost = posts.filter((item) => item.isPublic === !!isPublic)
    res.status(200).send({
        data: listPost,
        total: listPost.length
    })
})


app.listen(PORT, (err) => {
    if (err) throw new Error
    console.log(`Server run in http://localhost:${PORT}`);
})