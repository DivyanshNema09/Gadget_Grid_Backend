const express = require("express")
const cartRoute = express.Router()
const {showCart , addToCart, updateCart, removeFromCart , clearCart} = require("../../controller/CartController/cart.controller")
const cartMiddleware = require("../../middleware/AuthMiddleWatre/CartMiddleware/cart.middleware")
cartRoute.get("/showCart" , cartMiddleware ,  showCart)
cartRoute.post("/addToCart" , cartMiddleware , addToCart)
cartRoute.put("/updateCart/:id" , cartMiddleware , updateCart)
cartRoute.delete("/removeFromCart/:id" , cartMiddleware , removeFromCart)
cartRoute.delete("/clearCart" , cartMiddleware , clearCart)



module.exports = cartRoute