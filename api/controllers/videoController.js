const asyncHandler = require("express-async-handler");
const Video = require("../models/VideoModel");
const User = require("../models/UserModel");
const createError = require("../error");

const createVideo = asyncHandler(async (req, res,next) => {
    try {
        const newVideo = new Video({ userId: req.user.id, ...req.body });
        const savedVideo =await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err)
    }
});


const updateVideo = asyncHandler(async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        next(createError(404, "Video Not Found!"));
      }
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedVideo);
        } else {
          next(createError(404,"You can only update your videos!"));
        }
} catch (err) {
  next(err);
  }
});

const deleteVideo = asyncHandler(async (req, res,next) => {
  try {
  const video = await Video.findById(req.params.id);
  if (req.user.id === video.userId) {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("Video Has Been Deleted successfuly.");
  } else {
   next(createError(404,"You can only delete your Videos!"));
  }
} catch (err) {
    next(err);
    }
});

const getVideo = asyncHandler(async (req, res,next) => {
    try {
       const getvid= await Video.findById(req.params.id);
        res.status(200).json(getvid);
} catch (err) {
      next(err);
    }
});

const viewVideo = asyncHandler(async (req, res,next) => {
    try {
      await Video.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 }        
      });
      res.status(200).json("view has been increased");
} catch (err) {
 next(err)
  }
});


const trendVideo = asyncHandler(async (req, res,next) => {
    try {
      const videos = await Video.find().sort({ views: -1 });
      res.status(200).json(videos);
} catch (err) {
  next(err);
  }
});

const randomVideo = asyncHandler(async (req, res,next) => {
    try {
       const videos= await Video.aggregate([{$sample:{size:40}}]);
        res.status(200).json(videos);
} catch (err) {
  next(err)
  }
});

const subVideo = asyncHandler(async (req, res,next) => {
    try {
      const user = await User.findById(req.user.id);
      const subscribedChanels = user.subscribedUsers;
      const list =await Promise.all(subscribedChanels.map((chanelId) => {
        return Video.find({ userId: chanelId });
      }));
      res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt));
} catch (err) {
      next(err);
  }
});

const getByTags = asyncHandler(async (req, res,next) => {
  try {
    const tags = req.query.tags.split(",");
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos)
  } catch (err) {
    next(err)
  }
});

const getBySearch = asyncHandler(async (req, res,next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query,$options:"i"}
    }).limit(40)
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
});





module.exports = {
  createVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  viewVideo,
  trendVideo,
  randomVideo,
  subVideo,
  getByTags,
  getBySearch,
};