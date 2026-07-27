import express from "express"
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "./cart.controller.js"
import { auth } from "../../middleware/auth.js"

export const cartRoutes = express.Router()

cartRoutes.use(auth)

cartRoutes.get("/", getCart)
cartRoutes.post("/", addToCart)
cartRoutes.put("/:productId", updateCartItem)
cartRoutes.delete("/:productId", removeFromCart)
cartRoutes.delete("/", clearCart)
