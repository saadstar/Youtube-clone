const asyncHandler = require("express-async-handler");
const Comment = require("../models/CommentModel");
const Video = require("../models/VideoModel");
const createError = require("../error");

const createComment = asyncHandler(async (req, res,next) => {
    try {
        const comment = new Comment({ userId:req.user.id, ...req.body })
        const savedComment = await comment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        next(err);
    }
});

const deleteComment = asyncHandler(async (req, res) => {
    try {
        const comment=await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id);
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment Deleted Successfuly.");
        } else {            
            next(createError(403,"You can only delete your Comments!"));
        }
    } catch (err) {
        next(err);
    }
});

const  getComment= asyncHandler(async (req, res) => {
    try {
        const commenter = await Comment.find({videoId:req.params.videoId});
        res.status(200).json(commenter);        
    } catch (err) {
        next(err);
    }
});


module.exports = {
    createComment,
    deleteComment,
  getComment,};