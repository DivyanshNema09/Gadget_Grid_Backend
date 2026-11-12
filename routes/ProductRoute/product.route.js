const express = require("express")
const productRoute = express.Router()
const {allProduct , search , iteam} = require("../../controller/ProductContoller/product.contro")
productRoute.get("/allProduct" , allProduct);
productRoute.get("/search" , search);
productRoute.get("/iteam/:id" , iteam)

module.exports = productRoute