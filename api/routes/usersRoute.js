const express = require("express");
const router = express.Router();
const verifyToken = require("../midleware.js/verfiyToken");
const {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unSubscribe,
  like,
  disLike,
} = require("../controllers/usersController");


// // update user
router.put("/:id",verifyToken, updateUser);
// //delete user
router.delete("/:id",verifyToken, deleteUser);
// // get a user
router.get("/find/:id", getUser);
// subscribe a user
router.put("/sub/:id",verifyToken, subscribe);
// // unsubscribe a user 
router.put("/unsub/:id",verifyToken, unSubscribe);
// // like a video 
router.put("/like/:videoId",verifyToken, like);
// // dislike a video 
router.put("/dislike/:videoId",verifyToken, disLike);

module.exports = router;
