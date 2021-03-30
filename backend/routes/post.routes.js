const express = require('express');
const Post = require('../models/post.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');

const ObjectID = require('bson').ObjectID;
const {checkAuth} = require('../helpers/auth.helpers.js');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
    try{
        const {token} = req.headers;

        if(!checkAuth(token)) {
            res.status(401).json({
                success: false,
                message: "Unathorized access restricted!",
            });
            return;
        }
               
        Post.aggregate([
            {$match: {},},
            {
                $lookup: {
                    from : 'users',
                    localField: 'posterId',
                    foreignField: '_id',
                    as: 'postUser'
                }
            }
        ], (error, posts) => {   
            if (error) {
                res.status(401).json({
                    success: false,
                    message: error.message,
                    });
            } else {
                if (posts) {
                    res.status(200).send({
                        success: true,
                        posts:posts
                    });
                }  else {
                    res.status(404).json({
                        success: false,
                        message: "Post not added yet!!",
                    });
                }
            }
        })       
    } catch(e) {
        res.status(404).json({
            success: false,
            message: "Something went wrong!",
        });
    }
})

postRouter.post('/', async (req, res) => {
    try{
        const id  = new ObjectID().toString();
        let {type, description, files, posterId, postedAt} = req.body,
            {token} = req.headers,
            userId = await checkAuth(token),
            postData = {
                // _id: id,
                type,
                description,
                files: files || [],
                posterId: userId,
                postedAt 
            };

        Post.insertMany(postData, (error, post) => {   
            if (error) {
                console.log("err: ", error)
                res.status(401).json({
                    success: false,
                    message: error.message,
                    });
            } else {
                if (post) {
                    res.status(200).send({
                        success: true,
                        post:post
                    });
                }  else {
                    console.log("err: ")
                    res.status(404).json({
                        success: false,
                        message: "Post not added yet!!",
                    });
                }
            }
        })       
    } catch(e) {
        console.log("err: 2",e )
        res.status(404).json({
            success: false,
            message: "Something went wrong!",
        });
    }
})

postRouter.get('/comments', (req, res) => {
    try{
        const {token} = req.headers;
        const commentIds = req?.query?.commentIds || [];

        console.log("commentIds: ", commentIds);
        console.log("token: ", token);

        if(!checkAuth(token)) {
            res.status(401).json({
                success: false,
                message: "Unathorized access restricted!",
            });
        }
        let query = {};

        if(commentIds.length > 0) {
            query['_id'] = {$in: commentIds};
        }
               
        Comment.aggregate([
            {$match: query,},
            {
                $lookup: {
                    from : 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'commentUser'
                }
            }
        ], (error, comments) => {   
            if (error) {
                console.log("err", error);
                res.status(401).json({
                    success: false,
                    message: error.message,
                    });
            } else {
                res.status(200).send({
                    success: true,
                    comments
                });
            }
        })       
    } catch(e) {
        res.status(404).json({
            success: false,
            message: "Something went wrong!",
        });
    }
});

postRouter.post('/comments', async (req, res) => {
    try{
        const id  = new ObjectID().toString();
        const {token} = req.headers;
        const {description, commentedAt,postId} = req.body
        const userId = await checkAuth(token);

        if(!userId) {
            res.status(401).json({
                success: false,
                message: "Unathorized access restricted!",
            });
            return;
        }

        let commentData = {
            _id: id,
            description,
            commentedAt,
            files:[],
            commenterId: userId
        }

        console.log("id: ", id);
        console.log("commentData: ", commentData);
               
        Comment.insertMany(commentData, (error, comment) => {   
            if (error) {
                console.log("err", error);
                res.status(401).json({
                    success: false,
                    message: error.message,
                    });
            } else {
                if (comment) {
                    let isPostUpdated = false;

                    if(postId) {
                        isPostUpdated = Post.updateOne({_id: postId}, {$push:{commentIds:id}});
                    }

                    if(isPostUpdated) {
                        res.status(200).send({
                            success: true,
                            comment
                        });
                    }
                } else {
                    res.status(403).json({
                        success: false,
                        message: "Comment not added yet!!",
                    });
                }
            }
        })       
    } catch(e) {
        console.log("e", e);
        res.status(404).json({
            success: false,
            message: "Something went wrong!",
        });
    }
})


module.exports = postRouter;