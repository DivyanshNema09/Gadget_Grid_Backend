const jwt = require("jsonwebtoken")
const cartMiddleware = (req,res,next) =>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            success : false,
            message : "Please Login First"
        })
    }
    const decode = jwt.verify(token , process.env.JWT_SECRET)
    // console.log(decode)
    req.user = decode
    next()
}

module.exports = cartMiddleware