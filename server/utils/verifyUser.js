const Jwt = require ("jsonwebtoken");
const { errorHandler }= require ("./error.js");

const verifyToken=(req,res,next)=>{
const token = req.cookies.access_token;


  if(!token){
    return next(errorHandler(401, 'You are not logged in'));

  }
  Jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err){
        return next(errorHandler(401, 'You are not logged in'));
    }
    req.user= user;

    next();
  })

}

module.exports={verifyToken};