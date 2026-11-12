const joi = require("joi")

const productSchema = joi.object({

    image: joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Product image is required",
            "any.required": "Product image is required"
        }),

    productName: joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": "Product name is required",
            "string.min": "Product name must be at least 3 characters",
            "string.max": "Product name cannot exceed 100 characters",
            "any.required": "Product name is required"
        }),

    brand: joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Brand name is required",
            "any.required": "Brand name is required"
        }),

    category: joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Category is required",
            "any.required": "Category is required"
        }),

    description: joi.string()
        .trim()
        .min(10)
        .required()
        .messages({
            "string.empty": "Description is required",
            "string.min": "Description must contain at least 10 characters",
            "any.required": "Description is required"
        }),

    price: joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than 0",
            "any.required": "Price is required"
        }),

    stock: joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "Stock must be a number",
            "number.integer": "Stock must be an integer",
            "number.min": "Stock cannot be negative",
            "any.required": "Stock is required"
        })

});


module.exports = {productSchema}