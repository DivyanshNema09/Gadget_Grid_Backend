const Product = require("../../model/ProductSchema/Product.schema")
const Cart = require("../../model/CartSchema/cart.schema")

const showCart = async (req, res) => {
    try {

        const userCart = await Cart.find({})
        const userId = req.user.userId
        const cart = await Cart.findOne({user: userId})
        if(!cart){
            return res.status(404).json({
                success : false,
                message : "Cart Not Found"
            })
        }
        if (cart.items.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart is Empty"
            })
        }

        return res.status(201).json({
            success: true,
            message: "User Cart",
            userCart
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user.userId;

        // console.log(productId)

        // Check whether product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

        // Check quantity
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer!"
            });
        }

        // Check product stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock!"
            });
        }

        // Find user's cart or create a new one
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: []
            });
        }

        // Check whether product already exists in cart
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            if (existingItem.quantity + quantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Requested quantity exceeds available stock!"
                });
            }

            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity
            });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully!",
            cart
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const updateCart = async (req, res) => {
    try {
        const  userId  = req.user.userId
        const productId = req.params.id
        const { quantity } = req.body

        console.log(productId)

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity Should be Positive Integer!"
            })
        }

        const product = await Product.findById(productId)


        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        if (quantity > Number(product.stock)) {
            return res.status(400).json({
                success: false,
                message: "Requested Quantity Exceed From Stock"
            })
        }

        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }

        const cartItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        cartItem.quantity = quantity;

        await cart.save()

        return res.status(201).json({
            success: true,
            message: "Cart iteam Update SuccessFully",
            cart
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

const removeFromCart = async (req, res) => {
    try {
        const  userId  = req.user.userId
        const  productId  = req.params.id

        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }

        const itemIndex = await cart.items.findIndex(
            (items) => items.product.toString() === productId
        )

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found in the cart!!"
            })
        }

        cart.items.splice(itemIndex, 1)

        await cart.save()

        return res.status(200).json({
            success: true,
            message: "Item Remove From Cart SuccessFully!!",
            cart
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const clearCart = async (req, res) => {
    try {
        const  userId  = req.user.userId

        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }

        cart.items = []

        await cart.save()

        return res.status(200).json({
            success: true,
            message: "Clear Cart Successfully!!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = { showCart, addToCart, updateCart, removeFromCart, clearCart }