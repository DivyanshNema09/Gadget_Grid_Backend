const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      ],
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
        match: [
            /^[6-9]\d{9}$/,
        ]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // unique: true,
        minLength: 8,
        // match: [
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        // ]
    },
    avatar : {
        type : String,
        default : ""
    }
})

const user = mongoose.model("user", userSchema);
module.exports = user