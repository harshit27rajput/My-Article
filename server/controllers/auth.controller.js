const { User } = require('../models/user.model.js')
const bcryptjs =require( 'bcryptjs');
const errorHandler=require('../utils/error.js')
const jwt=require('jsonwebtoken')

const signup=async(req, res,next)=>{
    console.log(req.body)
    const {username,email,password}=req.body;

    if(!username || !email || !password || username===''|| email===""|| password===""){
        return next(errorHandler(400,'All fields are required'));
        // return res.status(400).json({msg:"Please fill out all fields"})
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
const signin=async(req, res, next)=>{
    const{email, password}=req.body
    if(!email || !password || email==='' || password===''){
        next(errorHandler(400,"Email and Password is required"))
    }
    try{
    const isValidUser=await User.findOne({email});
    if(!isValidUser){
        return next(errorHandler(401, 'Invalid Email or Password'))
    }
    const isValidPassword=bcryptjs.compareSync(password, isValidUser.password)
    if (!isValidPassword){
        return next(errorHandler(400,'Invalid Password'))
    }
    const token=jwt.sign({id:isValidUser._id},process.env.JWT_SECURE)
    const {password:pass, ...others}= isValidUser._doc

    res.status(200)
    .cookie('access_token',token,{
        httpOnly:true
    })
    .json(others)
}
catch(error){
    next(error)
}
}
module.exports ={signup,signin}