import { productModel } from "../../../db/models/product.model.js"

// GET /products 
export async function getProducts(req, res) {
    const products = await productModel.find()
    res.status(200).json({ message: "all products", products })
}

// GET /products/:id
export async function getProductById(req, res) {
    const product = await productModel.findById(req.params.id)
    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }
    res.status(200).json({ message: "product found", product })
}

// POST /products (admin)
export async function createProduct(req, res) {
    try {
        req.body.createdBy = req.user._id
        const newProduct = await productModel.create(req.body)
        res.status(201).json({ message: "product added successfully", product: newProduct })
    } catch (err) {
        res.status(500).json({ message: "failed to add product", error: err.message })
    }
}

// PUT /products/:id (admin)
export async function updateProduct(req, res) {
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) {
            return res.status(404).json({ message: "product not found" })
        }
        res.status(200).json({ message: "product updated successfully", product })
    } catch (err) {
        res.status(500).json({ message: "failed to update product", error: err.message })
    }
}

// DELETE /products/:id (admin )
export async function deleteProduct(req, res) {
    const product = await productModel.findByIdAndDelete(req.params.id)
    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }
    res.status(200).json({ message: "product deleted successfully" })
}
