const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/authRoute");
const usersRouter = require("./routes/usersRoute");
const videoRouter = require("./routes/videoRoute");
const commentRouter = require("./routes/commentRoute");
const cors = require("cors");

const PORT = 3500 || process.env.PORT;
connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/video", videoRouter);
app.use("/api/comment", commentRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went Wrong!";
    return res.status(status).json({
        success: false,
        status: status,
        message:message
    })
})


app.listen((PORT), () => {
    console.log(`Server Running on ${PORT}`)
})