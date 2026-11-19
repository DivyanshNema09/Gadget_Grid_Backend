const product = require("../../model/ProductSchema/Product.schema")
const mongoose = require("mongoose")
const allProduct = async (req, res) => {
    try {
        const isProducts = await product.find({});
        if (isProducts.length === 0) {
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
        const { item, category, brand } = req.query;

        const filters = [];

        if (item) {
            filters.push({
                productName: {
                    $regex: item,
                    $options: "i"
                }
            });
        }

        if (category) {
            filters.push({
                category: {
                    $regex: category,
                    $options: "i"
                }
            });
        }

        if (brand) {
            filters.push({
                brand: {
                    $regex: brand,
                    $options: "i"
                }
            });
        }

        if (filters.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a search query"
            });
        }

        const findProducts = await product.find({
            $or: filters
        });

        return res.status(200).json({
            success: true,
            message: "Search completed",
            findProducts
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const iteam = async (req, res) => {
    try {
        let { id } = req.params

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

module.exports = { allProduct, search, iteam }