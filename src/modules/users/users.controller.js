import { userModel } from "../../../db/models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendConfirmationEmail } from "../../utils/sendEmail.js"

// POST /users/signup
export async function signUp(req, res) {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8)

        const newUser = await userModel.create(req.body)

        const confirmToken = jwt.sign(
            { _id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        const confirmLink = `${process.env.BASE_URL}/users/confirm-email/${confirmToken}`

        try {
            await sendConfirmationEmail(newUser.email, confirmLink)
        } catch (mailErr) {
            console.log("warning: confirmation email failed to send:", mailErr.message)
        }

        newUser.password = undefined
        res.status(201).json({ message: "user registered, please check your email to confirm your account", user: newUser })
    } catch (err) {
        res.status(500).json({ message: "signup failed", error: err.message })
    }
}

// GET /users/confirm-email/:token
export async function confirmEmail(req, res) {
    try {
        jwt.verify(req.params.token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "invalid or expired confirmation link" })
            }

            const user = await userModel.findById(decoded._id)
            if (!user) {
                return res.status(404).json({ message: "user not found" })
            }

            user.isConfirmed = true
            await user.save()

            res.status(200).json({ message: "email confirmed successfully, you can login now" })
        })
    } catch (err) {
        res.status(500).json({ message: "confirmation failed", error: err.message })
    }
}

// POST /users/login
export async function login(req, res) {
    try {
        const foundUser = await userModel.findOne({ email: req.body.email })
        if (!foundUser) {
            return res.status(404).json({ message: "user not found" })
        }

        const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password)
        if (!passwordMatches) {
            return res.status(401).json({ message: "email or password incorrect" })
        }

        if (!foundUser.isConfirmed) {
            return res.status(403).json({ message: "please confirm your email first" })
        }

        const token = jwt.sign(
            { _id: foundUser._id, role: foundUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.status(200).json({ message: "logged in successfully", token })
    } catch (err) {
        res.status(500).json({ message: "login failed", error: err.message })
    }
}
