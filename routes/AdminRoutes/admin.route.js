const express = require("express")
const adminRoute = express.Router()
const {productSchema} = require("../../validator/product.validate")
const validate = require("../../middleware/AuthMiddleWatre/validate")
const adminMiddleware = require("../../middleware/AuthMiddleWatre/AdminMiddleware/Admin.MiddleWare")
const {admin , register , login , addProduct , updateProduct , deleteProduct} = require("../../controller/Admin/Admin.controller")
adminRoute.get("/admin" , admin)
adminRoute.post("/register" , register)
adminRoute.post("/login" , login)
adminRoute.post("/addProduct" , adminMiddleware , validate(productSchema) , addProduct)
adminRoute.put("/updateProduct/:id" , adminMiddleware , updateProduct)
adminRoute.delete("/deleteProduct/:id" , adminMiddleware , deleteProduct)

module.exports = adminRoute