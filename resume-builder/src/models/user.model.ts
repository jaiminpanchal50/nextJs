import { IUser } from "@/types/user.type";
import bcrypt from "bcryptjs";
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
        minlength: [10, "Minimum 10 char required"],
        maxlength: [10, "Maximum 10 char required"],
    },
}, { timestamps: true })


userSchema.pre('save', function (): void {
    if (!this.isModified("password")) return

    this.password = bcrypt.hashSync(this.password, 10)
})

userSchema.methods.comparePassword = function (password: string): boolean {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", userSchema)
export default User