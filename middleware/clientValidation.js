// Import
import { check, validationResult } from "express-validator";

// Client valdiation
export const validate_client = [
    check("company_name")
        .notEmpty()
        .withMessage('Company name field can not be empty'),
    check("client_name")
        .notEmpty()
        .withMessage('Client name field can not be empty'),
    check("phone")
        .notEmpty()
        .withMessage('Phone number field can not be empty'),
];

// Handling Errors
export const handle_validation_errors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map((error) => ({
                field: error.param,
                message: error.msg
            }))
        });
    };
    next();
};