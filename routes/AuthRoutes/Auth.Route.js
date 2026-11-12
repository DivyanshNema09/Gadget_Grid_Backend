const express = require("express")
const authRoute = express.Router()

const validate = require("../../middleware/AuthMiddleWatre/validate")
const {registerSchema , loginSchema , updateProfileSchema} = require("../../validator/auth.validate")

const profileMiddleware = require("../../middleware/AuthMiddleWatre/Auth.profile.MiddleWare")
const {register , login , profile , logout} = require("../../controller/Auth/Auth.controller")
authRoute.post("/register" , validate(registerSchema) , register)
authRoute.post("/login" , validate(loginSchema) , login)
authRoute.get("/profile" , profileMiddleware , profile)
authRoute.get("/logout" , logout)

module.exports = authRoute