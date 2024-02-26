const { User } = require('../models/user.model.js')
const bcryptjs =require( 'bcryptjs');
const signup=async(req, res,next)=>{
    console.log(req.body)
    const {username,email,password}=req.body;

    if(!username || !email || !password || username===''|| email===""|| password===""){
        return res.status(400).json({msg:"Please fill out all fields"})
    }
    const hashedPassword= bcryptjs.hashSync(password, 10);
    const newUser= new User ({
        username,email,password:hashedPassword,
    })
    try{
        await newUser.save()
        res.json('User Created')
    }
    catch(error){
        next(error)
    }
}

module.exports ={signup}