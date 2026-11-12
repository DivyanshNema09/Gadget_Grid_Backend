const mongoose = require("mongoose")

const dbConnected = async () =>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnected