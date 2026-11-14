const mongoose = require("mongoose")

const favouriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            }
        }
    ]
})

// favouriteSchema.index(
//     { user: 1, product: 1 },
//     { unique: true }
// );

const wishlist = mongoose.model("wishlist"  , favouriteSchema)

module.exports = wishlist