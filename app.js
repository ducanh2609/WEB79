import express from 'express'
import connectBd from './ultis/db.js'
import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
import { register } from './controllers/users.controllers.js'
import { checkRoleUser } from './middlewares/auths.middlewares.js'
import { getAdminPage } from './controllers/posts.controllers.js'


const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', () => {
    res.send('Homepage')
})

app.use('/users', userRouter)
app.post('/register', register)
app.use('/posts', postRouter)
app.get('/admin/setting', checkRoleUser, getAdminPage)

// app.post('/comment', async (req, res) => {
//     const { content, userId, postId } = req.body
//     try {
//         const createdComment = await CommentModel.create({
//             userId, postId, content
//         })
//         if (createdComment) {
//             res.status(200).send({
//                 message: 'Created',
//                 data: createdComment,
//             })
//         }
//     } catch (error) {
//         res.status(500).send({
//             error: error.message
//         })
//     }
// })

// app.put('/comment/:commentId', async (req, res) => {
//     const { commentId } = req.params
//     const { userId } = req.query
//     const { content } = req.body
//     try {
//         const currentComment = await CommentModel.findById(commentId)
//         if (!currentComment) {
//             throw new Error('Comment not found')
//         }
//         if (currentComment.userId !== userId) {
//             throw new Error('User can not edit this comment')
//         }
//         currentComment.content = content
//         await currentComment.save();
//         res.status(201).send({
//             data: currentComment,
//             message: 'Updated',
//             success: true
//         });
//     } catch (error) {
//         res.status(500).send({
//             error: error.message
//         })
//     }
// })

// app.get('/comment', async (req, res) => {
//     try {
//         const { postId } = req.params
//         const findComment = await CommentModel.find(postId)
//         if (!findUser) {
//             throw new Error('Comment not found')
//         }
//         res.status(200).send({
//             comments: findComment,
//             total: findComment.length,
//             status: 'Success'
//         })
//     } catch (error) {
//         res.send({
//             message: error.message
//         })
//     }
// })



app.listen(PORT, (err) => {
    if (err) throw new Error
    console.log(`Server run in http://localhost:${PORT}`);
    connectBd()
})