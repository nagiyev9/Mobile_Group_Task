import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../middleware/logger.js";

dotenv.config();

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    } catch (error) {
        logger.error(error.message);
        console.log("Error while connect database", error);  
    };
};