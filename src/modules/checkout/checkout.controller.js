import { cartModel } from "../../../db/models/cart.model.js"
import { orderModel } from "../../../db/models/order.model.js"

// POST /checkout
export async function checkout(req, res) {
    try {
        const cart = await cartModel.findOne({ user: req.user._id }).populate("items.product")

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "cart is empty" })
        }

        let totalPrice = 0
        const orderItems = cart.items.map((item) => {
            const itemTotal = item.product.price * item.quantity
            totalPrice += itemTotal
            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            }
        })

        const newOrder = await orderModel.create({
            user: req.user._id,
            items: orderItems,
            totalPrice
        })

        cart.items = []
        await cart.save()

        res.status(201).json({ message: "order placed successfully", order: newOrder })
    } catch (err) {
        res.status(500).json({ message: "checkout failed", error: err.message })
    }
}

export async function getMyOrders(req, res) {
    const orders = await orderModel.find({ user: req.user._id }).populate("items.product")
    res.status(200).json({ message: "my orders", orders })
}
