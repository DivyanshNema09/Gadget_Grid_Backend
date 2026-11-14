const express = require("express")
const wishlist = express.Router()
const wishlistMiddleware = require("../../middleware/AuthMiddleWatre/Wishlist.middleware/wishlist.middleware")
const {favourite , addFavourite , removeFavourite} = require("../../controller/wishList/wishlist.controller")

wishlist.get("/favourite" , wishlistMiddleware , favourite)
wishlist.post("/addFavourite/:id" , wishlistMiddleware , addFavourite)
wishlist.post("/removeFavourite/:id" , wishlistMiddleware , removeFavourite)

module.exports = wishlist