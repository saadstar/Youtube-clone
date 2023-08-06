const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const Video = require("../models/VideoModel");
const createError = require("../error");

const updateUser = asyncHandler(async (req, res,next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser= await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
      res.status(200).json(updatedUser);      
    } catch (err) {
      next(err);    
    }
  } else {
    next(createError(403,"You can update only your account!"));    
  }
});

const deleteUser = asyncHandler(async (req, res,next) => {
   if (req.params.id === req.user.id) {
     try {
       await User.findByIdAndDelete(req.params.id);
       res.status(200).json("Deleted Successfuly!");
     } catch (err) {
      next(err)
     }
   } else {
     next(createError(403,"you can delete only your account!"));
   }
});

const getUser = asyncHandler(async (req, res,next) => {
  try{
    const singelUser = await User.findById(req.params.id);
    res.status(200).json(singelUser);
  } catch (err) {
    next(err);
  }
});

const subscribe = asyncHandler(async (req, res,next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers :req.params.id},
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers :1},
    });
    res.status(200).json("Subscription Sucessfuly!");
  } catch (err) {
    next(err)
  }
});

const unSubscribe = asyncHandler(async (req, res,next) => {
   try {
     await User.findByIdAndUpdate(req.user.id, {
       $pull: { subscribedUsers: req.params.id },
     });
     await User.findByIdAndUpdate(req.params.id, {
       $inc: { subscribers: -1 },
     });
     res.status(200).json("UnSubscription Sucessfuly!");
   } catch (err) {
     next(err);
   }
});

const like = asyncHandler(async (req, res,next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("liked Video");
  } catch (err) {
   next(err);    
  }
});

const disLike = asyncHandler(async (req, res,next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
     $addToSet: { dislikes: id },
     $pull: { likes: id },
   });
    res.status(200).json("disliked Video");
  } catch (err) {
    next(err);
  }
});




module.exports = {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unSubscribe,
  like,
  disLike,
};