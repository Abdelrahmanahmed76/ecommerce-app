import express from "express"
import dotenv from "dotenv"
import { dbConnection } from "./db/connection.js"
import { usersRoutes } from "./src/modules/users/users.routes.js"
import { productsRoutes } from "./src/modules/products/products.routes.js"
import { cartRoutes } from "./src/modules/cart/cart.routes.js"
import { checkoutRoutes } from "./src/modules/checkout/checkout.routes.js"

dotenv.config() 

const app = express()

dbConnection()

app.use(express.json())

app.use("/users", usersRoutes)
app.use("/products", productsRoutes)
app.use("/cart", cartRoutes)
app.use("/checkout", checkoutRoutes)

app.listen(3000, () => {
    console.log("server running on port 3000")
})
