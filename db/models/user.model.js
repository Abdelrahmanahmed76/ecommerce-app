import { model, Schema } from "mongoose"

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },

    isConfirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

export const userModel = model("User", userSchema)
