const jwt = require("jsonwebtoken")
const adminMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success : false,
            message : "Please Login First or invalid token"
        })
    }

    next()
}

module.exports = adminMiddleware