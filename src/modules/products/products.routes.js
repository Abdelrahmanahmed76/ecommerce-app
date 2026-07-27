import express from "express"
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./products.controller.js"
import { auth } from "../../middleware/auth.js"
import { authorizeAdmin } from "../../middleware/authorizeAdmin.js"

export const productsRoutes = express.Router()

productsRoutes.get("/", getProducts)
productsRoutes.get("/:id", getProductById)

productsRoutes.post("/", auth, authorizeAdmin, createProduct)
productsRoutes.put("/:id", auth, authorizeAdmin, updateProduct)
productsRoutes.delete("/:id", auth, authorizeAdmin, deleteProduct)
