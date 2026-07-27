import { cartModel } from "../../../db/models/cart.model.js"
import { productModel } from "../../../db/models/product.model.js"

async function getOrCreateCart(userId) {
    let cart = await cartModel.findOne({ user: userId })
    if (!cart) {
        cart = await cartModel.create({ user: userId, items: [] })
    }
    return cart
}

// GET /cart
export async function getCart(req, res) {
    const cart = await getOrCreateCart(req.user._id)
    await cart.populate("items.product")
    res.status(200).json({ message: "cart", cart })
}

// POST /cart => body: { productId, quantity }
export async function addToCart(req, res) {
    try {
        const { productId, quantity } = req.body

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "product not found" })
        }

        const cart = await getOrCreateCart(req.user._id)
        const existingItem = cart.items.find((item) => item.product.toString() === productId)

        if (existingItem) {
            existingItem.quantity += quantity || 1
        } else {
            cart.items.push({ product: productId, quantity: quantity || 1 })
        }

        await cart.save()
        await cart.populate("items.product")
        res.status(200).json({ message: "product added to cart", cart })
    } catch (err) {
        res.status(500).json({ message: "failed to add to cart", error: err.message })
    }
}

// PUT /cart/:productId => body: { quantity }
export async function updateCartItem(req, res) {
    try {
        const cart = await getOrCreateCart(req.user._id)
        const item = cart.items.find((item) => item.product.toString() === req.params.productId)

        if (!item) {
            return res.status(404).json({ message: "product not found in cart" })
        }

        item.quantity = req.body.quantity
        await cart.save()
        await cart.populate("items.product")
        res.status(200).json({ message: "cart item updated", cart })
    } catch (err) {
        res.status(500).json({ message: "failed to update cart item", error: err.message })
    }
}

// DELETE /cart/:productId
export async function removeFromCart(req, res) {
    const cart = await getOrCreateCart(req.user._id)
    cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId)
    await cart.save()
    res.status(200).json({ message: "product removed from cart", cart })
}

// DELETE /cart 
export async function clearCart(req, res) {
    const cart = await getOrCreateCart(req.user._id)
    cart.items = []
    await cart.save()
    res.status(200).json({ message: "cart cleared" })
}
