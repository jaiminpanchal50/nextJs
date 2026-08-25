import jwt from "jsonwebtoken"
import { JWTPayload } from "@/types/user.type"

export const generateToken = (payload: JWTPayload): string => {  // we have passed the interface JWTPayload in the function parameter so if we pass any other type of data except JWTPayload then it will give error. :string is the return value of the function generateToken return string value so we have to provide this. 
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" })
}

export const verifyToken = (token: string): any => {
    return jwt.verify(token, process.env.JWT_SECRET!)
}