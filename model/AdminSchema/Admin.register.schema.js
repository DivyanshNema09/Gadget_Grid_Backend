const mongoose = require("mongoose")
const adminRegister = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    adminEmail: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        ],
    },
    adminPassword : {
        type : String,
        required : true,
    },
})

const adminRegis = mongoose.model("adminRegis" , adminRegister)
module.exports = adminRegis