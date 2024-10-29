import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authService from "../service/auth.service.js";
import { generateConfirmCode } from "../utils/generateConfirmCode.js";
import { transporter } from "../utils/sendMail.js";
import { signupMessage } from "../utils/messages/signup-message.js";
import { logger } from "../middleware/logger.js";

// Signup
export const signup = async (req, res) => {
    try {
        const { name, email, role,  password } = req.body;

        if (!["super user", "user"].includes(role)) {
            return res.status(400).json({ error: "Invalid role specified" });
        };

        const isExist = await authService.getUserByEmail(email);

        if (isExist) {
            return res.status(409).json({ error: "This email already registered" });  
        };

        const confirmCode = generateConfirmCode()

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Account Conformation',
            html: signupMessage(name, confirmCode)
        });

        req.session.unConfirmedUser = { name, email, role, password };
        req.session.confirmCode = confirmCode;

        res.status(200).json({ message: "Confirmation code has been sent your email!" });
    } catch (error) {
        logger.error(error.message);
        console.log(error);  
        res.status(500).json({ error: "Internal server error" });
    };
};

// Confirm account
export const confirmAccount = async (req, res) => {
    try {
        const { code } = req.body;
        const confirmCode = req.session.confirmCode;

        if (!code || confirmCode !== code) {
            return res.status(400).json({ error: confirmCode !== code ? "Wrong code" : "Please write confirmation code" });
        };

        const unConfirmedUser = req.session.unConfirmedUser;

        if (!unConfirmedUser) {
            return res.status(404).json({ error: "No Data!" });
        };

        const { name, email, role, password } = unConfirmedUser;

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await authService.createNewUser({
            name,
            email,
            role,
            password: hashPassword
        });

        await req.session.destroy(err => {
            if (err) {
                console.log(err);
                logger.error(err.message);
            };
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);  
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    };
};  

// Login 
export const login = async (req, res) =>{
    try {
        const { email, password } = req.body;

        const isExist = await authService.getUserByEmail(email);

        if (!isExist) {
            return res.status(404).json({ error: "Email Or Password is not correct!" });
        };

        const isPasswordCorrect = await bcrypt.compare(password, isExist.password);
        const token = jwt.sign({userID: isExist._id, role: isExist.role}, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

        if (!isPasswordCorrect) {
            return res.status(404).json({ error: "Email Or Password is not correct!" });
        };

        res.status(200).json({
            user: {
                id: isExist._id,
                email: isExist.email,
                name: isExist.name,
            },
            token
        });
    } catch (error) {
        console.log(error);  
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    };
};