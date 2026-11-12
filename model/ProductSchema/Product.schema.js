const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true,
    },
    productName :{
        type : String,
        required : true,
        trim : true,

    },
    brand : {
        type : String,
        required : true,
        trim : true,

    },
    category : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    price : {
        type : Number,
        required : true,
    },
    stock : {
        type : Number,
        required : true,
    }
})

const product = mongoose.model("product" , ProductSchema)

module.exports = product