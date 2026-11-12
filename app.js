require("dotenv").config()
const cookieParser = require("cookie-parser")
const express = require("express")
const authRoute = require("./routes/AuthRoutes/Auth.Route")
const productRoute = require("./routes/ProductRoute/product.route")
const adminRoute = require("./routes/AdminRoutes/admin.route")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/test" , authRoute)
app.use("/api/pro" , productRoute)
app.use("/api/divyansh" , adminRoute)

module.exports = app