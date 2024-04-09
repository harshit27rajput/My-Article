const express=require ('express')
const router = express.Router()
const { verifyToken } =require ('../utils/verifyUser.js');
const {deleteUser, updateUser} = require ('../controllers/user.controller.js'); 

router.get('/test', (req,res)=>{
    res.send("this is a test route")
});

router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)

module.exports=router; 