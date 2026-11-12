const product = require("../../model/ProductSchema/Product.schema")

const addToCart = async (req,res) => {
    const addedCart = req.body

    const addcart = await product.create({
        addedCart
    })

    if(!addCart){
        return res.status(201).json({
            success : true,
            message : ""
        })
    }
}