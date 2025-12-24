require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const cors = require("cors");
const fileUpload = require('express-fileupload')

const app = express()


app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.urlencoded())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const auth = require('./routes/auth')
const home = require('./routes/home')
const admin = require('./routes/admin')
const maintenance = require('./routes/maintenance')
const issue = require('./routes/issue')
const review = require('./routes/review')
const connectCloudinary = require('./config/cloudinary')
const { isLoggedin, isAdmin } = require('./middlewares/auth')

app.use('/api', auth)
app.use('/api', isLoggedin, home)
app.use('/api', isLoggedin, review)
app.use('/api', isLoggedin, issue)
app.use('/api', isLoggedin, isAdmin, admin)
app.use('/api', isLoggedin, isAdmin, maintenance)

// app.get("/run-test-backend", (req, res) => {
//     let arr = [
//         {
//             name: "adhil",
//             age: 23
//         },
//         {
//             name: "sinan",
//             age: 22
//         },
//         {
//             name: "salih",
//             age: 22
//         }
//     ]
//     return res.json({arr})
// })

app.use((req, res) => {
    return res.status(500).json({
        message: "api route failed",
    })
})
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on ${port}`)
    connectDB()
    connectCloudinary()
});