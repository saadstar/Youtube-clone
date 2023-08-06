const express = require("express")
const router = express.Router();
const { register, login, google } = require("../controllers/authController");
// POST register
router.post("/register", register);
// POST login
router.post("/login", login);
// POST google
router.post("/google", google);

module.exports = router;