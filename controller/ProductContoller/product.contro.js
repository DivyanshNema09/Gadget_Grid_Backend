const product = require("../../model/ProductSchema/Product.schema")
const mongoose = require("mongoose")
const allProduct = async (req, res) => {
    try {
        const isProducts = await product.find({});
        if (!isProducts) {
            return res.status(404).json({
                success: false,
                message: "No Product Found!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product Found!",
            isProducts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }

}

const search = async (req, res) => {
    try {
        let iteam = req.query.iteam;
        let category = req.query.category;
        let brand = req.query.brand;

        if (!iteam && !category && !brand) {
            return res.status(404).json({
                success: false,
                message: "Please Search For SomeThing"
            })
        }

        const findProducts = await product.find({
            $or: [
                { productName: iteam },
                { brand: brand },
                { category: category }
            ]
        })

        if (!findProducts) {
            return res.status(404).json({
                success: false,
                message: "No Product Found!"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Product Found!",
            findProducts
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const iteam = async (req, res) => {
    try {
        let {id} = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID",
            });
        }

        const isProduct = await product.findById(id);
        if (!isProduct) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product Found!",
            isProduct
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = { allProduct, search  , iteam }