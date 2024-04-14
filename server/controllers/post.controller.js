const Post = require('../models/post.models.js');
const {errorHandler} = require('../utils/error.js');

const create = async (req, res, next) => {
    if(!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a Post'));
    }
    if(!req.body.title || req.body.content){
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    const slug = req.body.title
    .split(' ')
    .join('_')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g,'');

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }
    catch(error) {
    next(error)
    }
}

const getposts = async (req, res, next)=>{
    try{
        const startIndex =parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9
        const sortDireaction = req.query.order === 'asc' ? 1:-1
        const posts=await Post.find({
            ...(req.query.userId && {userId : req.query.userId}),
            ...(req.query.category && {category : req.query.category}),
            ...(req.query.slug && {category : req.query.slug}),
            ...(req.query.postId && {_Id : req.query.postId}),
            ...(req.query.searchTerm && {
                $or: [ 
                    {title: {$regex: req.query.searchTerm, $options: 'i'}},
                    {content: {$regex: req.query.searchTerm, $options: 'i'}},
                ]
            })
        })
        .sort({updatedAt : sortDireaction})
        .skip(startIndex)
        .limit(limit)
        const totalPosts = await Post.countDocuments()

        const now = new Date(
            now.getFullYear(),
            now.getMonth() -1,
            now.getDate()
        )
        const lastMonthPosts = await Post.countDocuments({
            createdAt: {$gte: oneMonthAgo},
        })
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    }
    catch(error){
        next(error);
    }
}
module.exports= {create, getposts};