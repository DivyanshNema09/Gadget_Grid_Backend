const wishlist = require("../../model/WishList/wishlist.schema")
const product = require("../../model/ProductSchema/Product.schema")
const favourite = async (req, res) => {
    try {
        const userId = req.user.userId
        const isFavourite = await wishlist.find({ user: userId })

        if (!isFavourite) {
            return res.status(400).json({
                success: false,
                message: "wishlist Not Found"
            })
        }

        if (isFavourite.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Favorite Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "WishList Found",
            isFavourite
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

const addFavourite = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.id;

        // Check product exists
        const isProduct = await product.findById(productId);

        if (!isProduct) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        // Create wishlist if it doesn't exist
        await wishlist.updateOne(
            { user: userId },
            { $setOnInsert: { user: userId } },
            { upsert: true }
        );

        // Atomically add only if product is not already present
        const updatedWishlist = await wishlist.findOneAndReplace(
            {
                user: userId,
                "items.product": { $ne: productId }
            },
            {
                $push: {
                    items: { product: productId }
                }
            },
            {
                new: true
            }
        );

        if (!updatedWishlist) {
            return res.status(409).json({
                success: false,
                message: "Product already in wishlist"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Product Added to Favourite!",
            favourite: updatedWishlist
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const removeFavourite = async (req, res) => {
    try {

        const userId = req.user.userId;
        const productId = req.params.id;

        // Check whether product exists
        const isProduct = await product.findById(productId);

        if (!isProduct) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        // Remove product from wishlist
        const updatedWishlist = await wishlist.findOneAndReplace(
            {
                user: userId,
                "items.product": productId
            },
            {
                $pull: {
                    items: { product: productId }
                }
            },
            {
                new: true
            }
        );

        // Check whether product was in wishlist
        if (!updatedWishlist) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found in Wishlist"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product Removed from Favourite!",
            favourite: updatedWishlist
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


module.exports = { favourite, addFavourite , removeFavourite }