const mongoose=require ('mongoose')

const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePicture:{type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtd0soCSRdpo8Y5klekJdABh4emG2P29jwg&usqp=CAU"}
},
{
    isAdmin:{
        type:Boolean,
        default:false
    } 
})

const User= mongoose.model('user',userSchema)
module.exports={User} 