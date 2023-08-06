const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to database.")
    } catch (err) {
        console.log("Failed to connect to database!")
    }
}

module.exports = connectDB;