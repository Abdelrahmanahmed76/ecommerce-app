import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce-app")
        .then(() => console.log("db connected"))
        .catch((err) => console.log(err, "db connection error"))
}
