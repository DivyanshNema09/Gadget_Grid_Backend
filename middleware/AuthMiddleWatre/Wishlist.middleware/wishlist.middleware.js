const jwt = require("jsonwebtoken")
const wishlistMiddleware = async (req,res,next) =>{
    const token = req.cookies.token
    if(!token){
        return res.status(409).json({
            success : false,
            message : "USer Not Login"
        })
    }

    const decode =  jwt.verify(token , process.env.JWT_SECRET)
    req.user = decode;
    next()
    
}

module.exports = wishlistMiddleware