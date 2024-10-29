import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

export const ExpressSession = session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
});