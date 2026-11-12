const Joi = require("joi");

const registerSchema = Joi.object({

    userName: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.empty": "Username is required",
            "string.min": "Username must be at least 3 characters long",
            "any.required": "Username is required"
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email",
            "any.required": "Email is required"
        }),

    phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Please enter a valid 10-digit Indian phone number",
            "any.required": "Phone number is required"
        }),

    password: Joi.string()
        .trim()
        .min(8)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters long",
            "any.required": "Password is required"
        }),

    avatar: Joi.string()
        .uri()
        .allow("")
        .optional()
        .messages({
            "string.uri": "Please provide a valid avatar URL"
        })

});


const loginSchema = Joi.object({

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email",
            "any.required": "Email is required"
        }),

    password: Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required",
            "any.required": "Password is required"
        })

});


const updateProfileSchema = Joi.object({

    userName: Joi.string()
        .trim()
        .min(3)
        .messages({
            "string.min": "Username must be at least 3 characters long",
            "string.empty": "Username cannot be empty"
        }),

    email: Joi.string()
        .trim()
        .email()
        .messages({
            "string.email": "Please enter a valid email",
            "string.empty": "Email cannot be empty"
        }),

    phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .messages({
            "string.pattern.base": "Please enter a valid 10-digit Indian phone number",
            "string.empty": "Phone cannot be empty"
        }),

    avatar: Joi.string()
        .uri()
        .allow("")
        .messages({
            "string.uri": "Please provide a valid avatar URL"
        })

})
    .min(1)
    .messages({
        "object.min": "Please provide at least one field to update"
    });


module.exports = {registerSchema , loginSchema , updateProfileSchema};

