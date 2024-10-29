import { User } from "../model/user.model.js";
import { logger } from "../middleware/logger.js";

// Get user by email
const getUserByEmail = async email => {
    try {
        return await User.findOne({ email: email });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    };
};

// Create new user
const createNewUser = async user => {
    try {
        return await new User(user).save()
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    };
};

export default {
    getUserByEmail,
    createNewUser
}