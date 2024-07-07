import express from 'express'
import http from 'http'
import cors from 'cors'
import connectDB from './utils/db.js'
import multer from 'multer'
import bodyParser from 'body-parser'
import { Server } from 'socket.io'

import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
import { login, register } from './controllers/users.controllers.js'
import { Authentication, Authorization } from './middlewares/auths.middlewares.js'
import { getAdminPage } from './controllers/posts.controllers.js'
import { createFile } from './models/files.models.js'
import todoRouter from './routes/todos.routes.js'
import { createChat } from './controllers/chats.controllers.js'
import chatRouter from './routes/chats.routes.js'

const app = express()
const server = http.createServer(app)
const PORT = 8080
app.use(cors())
app.use(express.json())
// socket
const socketIo = new Server(server, {
    cors: {
        origin: '*',
    },
})

socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
    console.log("New client connected " + socket.id);

    socket.on("sendData", async function (data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
        console.log('data', data)
        socketIo.emit("sendData", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
        await createChat(data)
    })
    socket.on("typing", function (data) {
        console.log('type', data)
        socketIo.emit("typing", { data });
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ".jpeg")
    }
})
app.use(express.static('public'))
const uploadImage = multer({ storage })
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', () => {
    res.send('Homepage')
})
app.post('/login', login)
app.post('/register', register)
app.post('/upload/:userId', uploadImage.single('image'), async function (req, res) {
    try {
        const { userId } = req.params
        console.log(req.file)
        const src = `http://localhost:8080/image/${req.file.filename}`;
        const dataImage = {
            userId,
            src: [src],
        }
        await createFile(dataImage)
        res.redirect('http://localhost:3000')
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Upload failed!'
        })
    }
});
app.post('/uploadmultiple/:userId', uploadImage.array('images', 12), async (req, res, next) => {
    try {
        const { userId } = req.params
        const files = req.files
        if (!files) {
            throw new Error('Upload failed!')
        }
        const src = []
        files.forEach(item => {
            const url = `http://localhost:8080/image/${item.filename}`
            src.push(url)
        })
        const dataImage = {
            userId,
            src,
        }
        await createFile(dataImage)
        res.redirect('http://localhost:3000')
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})
app.use(Authentication)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/todos', todoRouter)
app.use('/chats', chatRouter)




app.get('/admin', Authorization, getAdminPage)

// Khi đăng kí tài khoản thì:
// + Check tk đã tồn tại chưa
// + Nếu chưa tồn tại thì mã hóa cái mk của người dùng => lưu vào DB => trả về ng dùng 1 cái token
// Đăng nhập: 
// + check dữ liệu ng dùng => check các trường so với DB => nếu khớp thì cho đăng nhập
// Truy cập các trang cần bảo mật hoặc cần dữ liệu đặc trưng của người dùng
// + Check token ng dùng gửi lên => giải mã xem dữ liệu ng dùng có đúng k
// Vào trang có quyền đặc biệt
// + check điều kiện đặc biêt của ng dùng qua token

server.listen(PORT, (err) => {
    if (err) throw new Error
    console.log(`Server run in http://localhost:${PORT}`);
    connectDB()
})