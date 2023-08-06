const express = require("express");
const router = express.Router();
const verifyToken = require("../midleware.js/verfiyToken");
const {
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
} = require("../controllers/videoController");


// POST create a video
router.post("/", verifyToken, createVideo);
// PUT a video
router.put("/:id", verifyToken, updateVideo);
// delte a video
router.delete("/:id", verifyToken, deleteVideo);
// get a video
router.get("/find/:id", getVideo);
// /view video 
router.put("/view/:id", viewVideo);
// /trend video 
router.get("/trend", trendVideo);
// /random video 
router.get("/random", randomVideo);
// /subscribed video 
router.get("/sub", verifyToken, subVideo);
// tag videos
router.get("/tags", getByTags);
// search 
router.get("/search", getBySearch);


module.exports = router;
