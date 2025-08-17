const mongoose = require("mongoose");
const logger = require("./utils/logger")
//MongoDB connection
const connectDB = async () =>{//connectDB function connecting server to mongodb
    try{
        await mongoose.connect(process.env.MONGO_URL)
        logger.info("MongoDB Connected")// this method connect to MongoDB
    } catch(error){
        logger.error("MongoDB connection failed", error)
    }
}

module.exports = connectDB;
