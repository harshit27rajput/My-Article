const express=require ('express')
const mongoose=require ('mongoose')
const dotenv =require('dotenv')
const userRouter = require('./routes/user.route.js') 
const authRouter =require('./routes/auth.route.js')

const app=express()
app.use(express.json())

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('connected to the database')
})
.catch((err)=>console.log(err))

app.listen(3001, (req, res)=>{
    console.log("server is running on port 3001")
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)