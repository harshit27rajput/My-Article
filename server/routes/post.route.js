const express=require('express');
const {verifyToken}=require('../utils/verifyUser.js')
const {create, getposts, deletepost} = require('../controllers/post.controller.js')

const router= express.Router();
router.post('/create', verifyToken, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId',verifyToken, deletepost)

export default router;