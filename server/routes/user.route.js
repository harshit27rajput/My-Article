const express=require ('express')

const router = express.Router()

router.get('/test', (req,res)=>{
    res.send("this is a test route")
}
);

module.exports=router; 