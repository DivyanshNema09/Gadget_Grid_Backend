const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../../model/AuthSchema/auth.schema")

const register = async (req, res) => {
    try {
        const { userName, email, password, phone } = req.body;
        if (!userName || !email || !password || !phone) {
            return res.status(400).json({
                success: true,
                message: "all details are required!"
            })
        }

        const isEmail = await user.findOne({ email: email })

        if (isEmail) {
            return res.status(409).json({
                success: false,
                message: "user already register with same email_Id!"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await user.create({
            userName,
            email,
            password: hashPassword,
            phone
        })

        return res.status(201).json({
            success: true,
            message: "User Created Successfully!",
            newUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All detail are requied!"
            })
        }

        const findEmail = await user.findOne({ email: email })

        if (!findEmail) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const isPassword = await bcrypt.compare(password, findEmail.password);

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({
            userId: findEmail._id,
            email: findEmail.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        })

        return res.status(201).json({
            success: true,
            message: "Login Successfully!",
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const profile = async (req, res) => {
    try {
        const findUser = await user.findById(req.user.userId)
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User Found",
            user: findUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

const logout = (req,res) =>{
    res.clearCookie("token");
    return res.status(200).json({
        success : true,
        message : "Logout Successfully"
    })
}


module.exports = { register, login , profile , logout}