const product = require("../../model/ProductSchema/Product.schema")
const adminRegis = require("../../model/AdminSchema/Admin.register.schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const admin = (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Welcome To Admin Page!!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const register = async (req, res) => {
    try {
        const { adminName, adminEmail, adminPassword } = req.body;
        if (!adminName || !adminEmail || !adminPassword) {
            return res.status(404).json({
                success: false,
                message: "All Details are Important"
            })
        }

        const findEmail = await adminRegis.findOne({ adminEmail: adminEmail });

        if (findEmail) {
            return res.status(409).json({
                success: false,
                message: "Already register with the same id"
            })
        }

        const hashPassword = await bcrypt.hash(adminPassword, 10)

        const createAdmin = await adminRegis.create({
            adminName: adminName,
            adminEmail: adminEmail,
            adminPassword: hashPassword
        })

        return res.status(201).json({
            success: true,
            message: "Admin Created Successfully",
            createAdmin
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const login = async (req, res) => {
    try {
        const { adminEmail, adminPassword } = req.body
        // console.log(adminEmail)
        // console.log(adminPassword)
        if (!adminEmail || !adminPassword) {
            return res.status(400).json({
                success: false,
                message: "All Detail are Requied!"
            })
        }

        const emailFound = await adminRegis.findOne({ adminEmail: adminEmail })

        if (!emailFound) {
            return res.status(404).json({
                success: false,
                message: "User not found!!"
            })
        }

        const isPassword = await bcrypt.compare(adminPassword, emailFound.adminPassword)

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid e-mail or Password"
            })
        }

        const token = jwt.sign({
            adminId: emailFound._id,
            adminEmail: emailFound.adminEmail
        },
            process.env.JWT_ADMIN_SECRET,
            {
                expiresIn: "1d"
            }
        )


        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        })

        return res.status(201).json({
            success: true,
            message: "Login Successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

const addProduct = async (req, res) => {
    try {
        const { image, productName, brand, category, description, price, stock } = req.body;

        if (!image || !productName || !brand || !category || !description || !price || !stock) {
            return res.status(404).json({
                success: false,
                message: "All details are requied!!"
            })
        }

        const newProduct = await product.create({
            image,
            productName,
            brand,
            category,
            description,
            price,
            stock
        })

        if (newProduct) {
            return res.status(201).json({
                success: true,
                message: "Product Added Successfully"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body

        const productUpdate = await product.findByIdAndUpdate(
            id,
            updatedData, {
            new: true,
            newValidator: true
        }
        )

        if (!productUpdate) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found!"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Product Updated SuccessFully!",
            productUpdate
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const deleteProduct = await product.findByIdAndDelete(id)

        if (!deleteProduct) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found!"
            })
        }

        return res.status(204).json({
            success: true,
            message: "Product Deleted SuccessFully"
        })
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

module.exports = { admin, register, login, addProduct, updateProduct , deleteProduct }