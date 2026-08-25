import { IUser } from "@/types/user.type";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // this is used to ensure that each email is unique and no two users can have the same email. 
    },
    password: {
        type: String,
        required: true, // this is used to ensure that the password is not empty when user is creating the account.
    },
    mobile: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User