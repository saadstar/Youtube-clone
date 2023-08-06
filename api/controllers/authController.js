const asyncHandler = require("express-async-handler");
const User=require("../models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../error");

// register
const register = asyncHandler(async (req, res,next) => {
    try {
        const { username, email, img, password } = req.body;
        // hashing Password Bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // creating new user
        const newUser = new User({
          username,email,img,
        password: hashedPassword        
        });
       const savedUser= await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        next(createError(404,"not Found Sorry!"))
}
});

//login
const login = asyncHandler(async (req, res,next) => {
    try {
        const { username, password } = req.body;
        if (!username) {                
            next(createError(404, "username is Required!"));
        }
        const user = await User.findOne({ username });
        if (!user) {                
            next(createError(404, "user Not Found!"));
        }
      // comparing Password Bcrypt
      const isCorrect= await bcrypt.compareSync(password, user.password);
        if (!isCorrect) {
         next(createError(400, "Wrong Password!"));
        }
        // const { password, ...others } = user;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });       
        res
          .cookie("access_token", token, { httpOnly: true })
            .status(200)
          .json(user);
    } catch (err) {        
       next(createError("Error in Login!"));
    }
});

const google = asyncHandler(async (req, res,next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
            res
                .cookie("access_token",token,{httpOnly:true})
                .status(200)
                .json(user._doc)
        } else {          
            const newUser = new User({
                ...req.body,
                fromGoogle:true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign(
              { id: savedUser._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "7d" }
            );
            res
              .cookie("access_token", token, { httpOnly: true })
              .status(200)
              .json(savedUser);
        }
    } catch (err) {
        next(err)
}
});

module.exports = { register, login, google };