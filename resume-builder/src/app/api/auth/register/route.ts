
import { connectDB } from "@/lib/db"
import { generateToken } from "@/lib/jwt"
import User from "@/models/user.model"
import { ApiResponse } from "@/types/api.types"
import { JWTPayload, RegisterBody } from "@/types/user.type"
import { NextRequest, NextResponse } from "next/server"

async function POST(req: NextRequest) { // NextRequest is used to get the values or parameters from the client or browser for POST , PUT , PATCH , DELETE  

    try {
        await connectDB()  // always you have to pass the connectDb fnc in any api route

        const body: RegisterBody = await req.json() // RegisterBody is the interface for the user data that we are going to receive from the frontend.   we get the value from the req.json()

        const { name, mobile, email, password } = body // destructuring the body

        if (!name || !email || !password) { // checking if the user has provided all the fields
            return NextResponse.json<ApiResponse>(    // NextResponse is used to return the response to the client or browser.
                // it returns JSON data in the form of 
                {
                    success: false,
                    message: "All fields are required"
                }, { status: 400 })
        }

        const userExists = await User.findOne({ email }) // checking if the user already exists
        if (userExists) {
            return NextResponse.json<ApiResponse>({ success: false, message: "User already exists" }, { status: 409 })
        }

        const user = await User.create({ name, email, password, mobile })

        let token = generateToken({ userId: user._id, email: user.email })
        console.log(token)



        const res = NextResponse.json<ApiResponse>({
            success: true, message: "User registered successfully", data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            }
        }, { status: 201 })

        res.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        })

        return res

    } catch (error) {
        console.log('error in register api', error)
        return NextResponse.json({ error: "Internal server error", success: false }, { status: 500 })
    }
}