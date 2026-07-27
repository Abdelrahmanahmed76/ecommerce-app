import mongoose, { model, Schema } from "mongoose"

const orderItemSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: Number,
    price: Number 
}, { _id: false })

const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "paid", "shipped", "delivered"],
        default: "pending"
    }
}, {
    timestamps: true,
    versionKey: false
})

export const orderModel = model("Order", orderSchema)
