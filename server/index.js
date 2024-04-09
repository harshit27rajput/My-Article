const express=require ('express')
const mongoose=require ('mongoose')
const dotenv =require('dotenv')
const userRouter = require('./routes/user.route.js') 
const authRouter =require('./routes/auth.route.js')
const cookieParser = require ('cookie-parser');

const app=express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('connected to the database')
})
.catch((err)=>console.log(err))

app.listen(3002, (req, res)=>{
    console.log("server is running on port 3002")
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode=err.statuscode || 500
    const message= err.message||'Internal Server Error'

    res.status(statusCode).json({
        success: false,
        message: message,
        statusCode
    })
})