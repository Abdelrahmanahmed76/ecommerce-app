import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
    const token = req.headers.token

    if (!token) {
        return res.status(401).json({ message: "token is required" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "invalid or expired token" })
        }
        req.user = decoded // { _id, role }
        next()
    })
}
