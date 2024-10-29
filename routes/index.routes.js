import express from "express";

import authRoute from "./auth.routes.js";
import clientRoute from "./client.routes.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.use('/auth', authRoute);
router.use('/client', protectRoute, clientRoute);

export default router;