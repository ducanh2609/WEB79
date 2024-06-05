import express from 'express'
import connectDB from './utils/db.js'
import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
import { login, register } from './controllers/users.controllers.js'
import { Authentication, Authorization } from './middlewares/auths.middlewares.js'
import { getAdminPage } from './controllers/posts.controllers.js'


const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', () => {
    res.send('Homepage')
})
app.post('/login', login)
app.post('/register', register)

app.use(Authentication)
app.use('/users', userRouter)
app.use('/posts', postRouter)


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

app.listen(PORT, (err) => {
    if (err) throw new Error
    console.log(`Server run in http://localhost:${PORT}`);
    connectDB()
})