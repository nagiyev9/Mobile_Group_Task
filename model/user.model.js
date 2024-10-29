import mongoose from "mongoose";

// Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["super user", "user"]
    },
    password: {
        type: String,
        required: true,
    }
});

// Model
export const User = mongoose.model('users', UserSchema);