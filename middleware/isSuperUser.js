import { logger } from "../middleware/logger.js";

export const isSuperUser = async (req, res, next) => {
    try {
        const { role } = req.user;

        if (role !== "super user" || !role) {
            return res.status(403).json({ error: "You do not have permission to use this function" });
        };

        next();
    } catch (error) {
        console.log(error);
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });  
    };
};