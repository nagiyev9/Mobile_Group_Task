import express from "express";

import { signup, confirmAccount, login } from "../controller/auth.controller.js";
import { limiter } from "../middleware/limiter.js";
import { validate_register, validate_login, validate_confirmCode, handle_validation_errors } from "../middleware/validation.js";

const router = express.Router();

router.post('/signup', [validate_register, handle_validation_errors], signup); // Signup
router.post('/signup/confirm', [validate_confirmCode, handle_validation_errors, limiter], confirmAccount); // Confirm signup
router.post('/login', [validate_login, handle_validation_errors, limiter], login); // Login

export default router;