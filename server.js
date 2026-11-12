// const mongoose = require("mongoose")
const app = require("./app")
const PORT = process.env.PORT || 4000
const dbConnected = require("./config/db")

const start = async ()=>{
    try {
        await dbConnected()
        app.listen(PORT , ()=>{
            console.log("server started successfully")
        })
    } catch (error) {
        console.log(error)
    }
}

start()




