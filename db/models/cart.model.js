import mongoose, { model, Schema } from "mongoose"

const cartItemSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}, { _id: false })

const cartSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true 
    },
    items: [cartItemSchema]
}, {
    timestamps: true,
    versionKey: false
})

export const cartModel = model("Cart", cartSchema)
