const express = require("express")
const authRoute = express.Router()
const {testing} = require("../../controller/TestingController/testing.controller")
authRoute.get("/testing" , testing)

module.exports = authRoute