import { userModel } from "../../db/models/user.model.js"

export const checkEmail = async (req, res, next) => {
    try {
        const exists = await userModel.findOne({ email: req.body.email })
        if (exists) {
            return res.status(409).json({ message: "user already registered, please login" })
        }
        next()
    } catch (err) {
        res.status(500).json({ message: "error checking email", error: err.message })
    }
}
