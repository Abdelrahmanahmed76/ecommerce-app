import express from "express"
import { checkout, getMyOrders } from "./checkout.controller.js"
import { auth } from "../../middleware/auth.js"

export const checkoutRoutes = express.Router()

checkoutRoutes.use(auth)

checkoutRoutes.post("/", checkout)
checkoutRoutes.get("/orders", getMyOrders)
