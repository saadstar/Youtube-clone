const express = require("express");
const router = express.Router();
const {
  createComment,
  deleteComment,
  getComment,
} = require("../controllers/commentController");
const verifyToken = require("../midleware.js/verfiyToken");


// POST create a comment
router.post("/", verifyToken, createComment);

// delete comment
router.delete("/:id", verifyToken, deleteComment);

// get single comment
router.get("/:videoId", verifyToken, getComment);

router.get("/tests", (req, res) => {
  res.status(200).json("dsafdsa")
})


module.exports = router;
