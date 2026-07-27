import express from "express"
import { checkEmail } from "../../middleware/checkEmail.js"
import { signUp, login, confirmEmail } from "./users.controller.js"

export const usersRoutes = express.Router()

usersRoutes.post("/signup", checkEmail, signUp)
usersRoutes.get("/confirm-email/:token", confirmEmail)
usersRoutes.post("/login", login)
